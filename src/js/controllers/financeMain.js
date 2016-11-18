angular.module('foodApp')
  .controller('financeMainController', financeMainController);


financeMainController.$inject = ['$auth', '$state', '$rootScope'];
function financeMainController($auth, $state, $rootScope) {
  const main = this;

  main.isLoggedIn = $auth.isAuthenticated;
  main.message = null;

  function logout() {
    $auth.logout()
    .then(() => {
      $state.go('financesIndex');
    });
  }

  const protectedStates = [];

  function secureState(e, toState) {
    main.message = null;
    if(!$auth.isAuthenticated() && protectedStates.includes(toState.name)) {
      e.preventDefault();
      $state.go('login');
      main.message = 'You need to login to see that!';
    }
  }

  $rootScope.$on('stateChangeStart', secureState);

  main.logout = logout;

  function createChart() {

    const ctx = document.getElementById('myChart1');
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Entertanment', 'Food', 'Utilities', 'Rent', 'Car' ],
        datasets: [{
          data: [12, 30, 200, 20, 40],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    });
  }
  main.createChart= createChart;
  main.createChart();

}
