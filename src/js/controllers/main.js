angular.module('foodApp')
  .controller('MainController', MainController)
  .controller('CountdownController', CountdownController);



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

CountdownController.$inject = [];
function CountdownController() {
  function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
      var t = getTimeRemaining(endtime);

      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }

  var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
  initializeClock('clockdiv', deadline);

}
