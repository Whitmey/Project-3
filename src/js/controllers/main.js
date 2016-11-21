angular.module('foodApp')
  .controller('MainController', MainController)
  .controller('CountdownController', CountdownController);



MainController.$inject = ['moment', 'Food', 'User', '$auth', '$state', '$rootScope'];
function MainController(moment, Food, User, $auth, $state, $rootScope) {
  const main = this;

  main.isLoggedIn = $auth.isAuthenticated;
  main.message = null;
  main.todaysCals = todaysCals;
  main.allFood = Food.query();
  main.yesterdayCounter = 0;
  main.caloryCounter = 0;
  main.allMyFoods = [];
  main.today = moment().format('DD/MM/YYYY');

  const thisUser = User.get({ id: $auth.getPayload()._id });


  //this function gets just this current users foods from all existing foods. pushes them to main.allMyFoods
  function getFoods() {
    main.caloryCounter = 0;
    main.allMyFoods = [];
    for(let j=0; j<main.allFood.length; j++) {
      if(thisUser.eaten.indexOf(main.allFood[j]._id) !== -1) {
        main.allMyFoods.push(main.allFood[j]);
      }
    }
  }

  //this function checks if items in users foods were eaten on this weekday and adds up calories for just those items.
  //instead of going by weekday will need to change this to specific date. could base axis on charts on weekday though.
  function todaysCals() {
    getFoods();
    //should turn this into a switch statement v
    for(let i=0; i<main.allMyFoods.length; i++) {
      if (main.allMyFoods[i].date == main.today){
        main.caloryCounter += main.allMyFoods[i].calories;
      }
      else if (main.allMyFoods[i].date == moment().subtract(1, 'days').format('DD/MM/YYYY')) {
        main.yesterdayCounter += main.allMyFoods[i].calories;
      }
    }
    console.log(main.allMyFoods);
  }


  function logout() {
    console.log('function ran');
    $auth.logout()
    .then(() => {
      $state.go('foodsIndex');
      console.log('logout pressed');
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

  let days = [];
  //function to populate a weeks worth of objects with dates and calories. they will update each day.
  function getDays() {
    days = [];
    for (let day=1; day<7; day ++) {
      days.push( {
        date: moment().subtract(day, 'days').format('DD/MM/YYYY'),
        calories: 0
      });
    }
    getCalories();
    console.log(days);
  }

  function getCalories() {
    for (let i=0; i<days.length; i++) {
      for (let k = 0; k< main.allMyFoods.length; k++) {
        if(main.allMyFoods[k].date === days[i].date) {
          days[i].calories += main.allMyFoods[k].calories;
        }
      }
    }
  }



  main.createChart = createChart;

//angular still breaks unless chart is initiated by a button click....
  function createChart() {
    todaysCals();
    getDays();


    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [days[5].date, days[4].date, days[3].date, days[2].date, days[1].date, days[0].date, 'Today'],
        datasets: [{
          label: '# of Votes',
          data: [days[5].calories, days[4].calories, days[3].calories, days[2].calories, days[1].calories, days[0].calories, main.caloryCounter],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(150, 205, 100, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(150, 205, 100, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}


// tesco primary api key: a3e5d8d2bece47679e56b9e289f3c6b3
// secondary key: 084af90bdc7e4569975087b403b43bcc


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
