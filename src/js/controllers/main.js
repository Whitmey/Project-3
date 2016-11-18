angular.module('foodApp')
  .controller('MainController', MainController);


MainController.$inject = ['$auth', '$state', '$rootScope'];
function MainController($auth, $state, $rootScope) {
  const main = this;

  main.isLoggedIn = $auth.isAuthenticated;
  main.message = null;

  function logout() {
    $auth.logout()
    .then(() => {
      $state.go('foodsIndex');
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

  // main.createChart();
}

// COMMENTED OUT PIE CHART DATA FOR REFFERENCE
// data = {
//   labels: ['Fibre', 'Protein', 'Carbohydrate', 'Fats', 'Water'],
//   datasets: [{
//     label: 'Foods',
//     data: [12, 30, 200, 20, 40],
//     backgroundColor: [
//       'rgba(255, 99, 132, 0.4)',
//       'rgba(54, 162, 235, 0.4)',
//       'rgba(255, 206, 86, 0.4)',
//       'rgba(75, 192, 192, 0.4)',
//       'rgba(153, 102, 255, 0.4)',
//       'rgba(255, 159, 64, 0.4)'
//     ],
//     borderColor: [
//       'rgba(255,99,132,1)',
//       'rgba(54, 162, 235, 1)',
//       'rgba(255, 206, 86, 1)',
//       'rgba(75, 192, 192, 1)',
//       'rgba(153, 102, 255, 1)',
//       'rgba(255, 159, 64, 1)'
//     ],
//     borderWidth: 1
//   }]
// };
