angular.module('foodApp')
.controller('MainController', MainController)
.controller('CountdownController', CountdownController);

MainController.$inject = ['moment', 'Food', 'User', '$auth', '$state', '$rootScope', '$window'];
function MainController(moment, Food, User, $auth, $state, $rootScope, $window) {
  const main = this;
  const Chart = $window.Chart;

  main.isLoggedIn = $auth.isAuthenticated;
  main.message = null;
  main.todaysCals = todaysCals;
  main.allFood = Food.query();
  main.caloryCounter = 0;
  main.allMyFoods = [];
  main.today = moment().format('DD/MM/YYYY');

  let thisUser = null;

  function getUser() {
    const payload = $auth.getPayload();
    if(payload) {
      thisUser = User.get({ id: $auth.getPayload()._id });
    }
  }

  getUser();


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
  function todaysCals() {
    getFoods();
    for(let i=0; i<main.allMyFoods.length; i++) {
      if (main.allMyFoods[i].date === main.today){
        main.caloryCounter += main.allMyFoods[i].calories;
      } 
    }
    console.log(main.allMyFoods);
  }



  function logout() {
    $auth.logout()
    .then(() => {
      $state.go('landing');
    });
  }



  function secureState(e, toState) {
    main.message = null;
    main.burgerOpen = false;
    if(!$auth.isAuthenticated() && toState.name !== 'landing') {
      e.preventDefault();
      $state.go('landing');
      main.message = 'You need to login to see that!';

    }
  }

  $rootScope.$on('$stateChangeStart', secureState);

  main.logout = logout;

  let days = [];
  //function to populate a MONTHS worth of objects with dates and calories. they will update each day.
  function getDays() {
    days = [];
    for (let day=1; day<28; day ++) {
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






  main.canShowCanvas = true;

  let labels = [];
  let datapoints = [];
  let chart = null;

  function createChart(data) {


    const chartElement = document.getElementById('myChart');



    if (chart && chart.destroy) {
      chart.destroy();
    }
    chart = new Chart(chartElement, {
      type: 'line',
      data: data
    });
  }

  function dailyChart() {
    todaysCals();
    getDays();
    labels = [' ', 'Today', ' '];
    datapoints = [main.caloryCounter, main.caloryCounter, main.caloryCounter];
    chartData(labels, datapoints);
  }

  function weeklyChart() {
    todaysCals();
    getDays();
    labels = [];
    datapoints = [];
    for (let i=0; i<6; i++) {
      labels.push(days[i].date);
      datapoints.push(days[i].calories);
    }
    labels.reverse();
    datapoints.reverse();
    labels.push('Today');
    datapoints.push(main.caloryCounter);

    chartData(labels, datapoints);
  }

  function monthlyChart() {
    todaysCals();
    getDays();
    labels = [];
    datapoints = [];
    for (let i=0; i<days.length; i++) {
      labels.push(days[i].date);
      datapoints.push(days[i].calories);
    }
    labels.reverse();
    datapoints.reverse();
    labels.push('Today');
    datapoints.push(main.caloryCounter);
    chartData(labels, datapoints);
  }

  function chartData(labels, datapoints) {
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'My First dataset',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: datapoints,
          spanGaps: false
        }
      ]
    };
    createChart(data);



  }

  main.dailyChart = dailyChart;
  main.weeklyChart = weeklyChart;
  main.monthlyChart = monthlyChart;
  main.dailyGoal = {};
  main.dailyGoal.date = moment().format('DD/MM/YYYY');



  function setDailyGoal() {
    main.thisUser.dailyGoal.push(main.dailyGoal);
    console.log(main.thisUser.dailyGoal);
    //disbale form
    main.thisUser.$update(() => {
      console.log('goal added to user');
    });
  }
  main.setDailyGoal = setDailyGoal;
  main.goalMessage = '';


  function checkDailyGoal() {
    todaysCals();
    getDays();
    User.get({ id: $auth.getPayload()._id }, ((user) => {
      main.thisUser = user;
      // console.log(main.thisUser.dailyGoal[0].target === 'exceed', main.thisUser.dailyGoal[0].amount);
      if(main.thisUser.completedGoals === undefined) {
        main.thisUser.completedGoals = 0;
      }
      if (main.thisUser.dailyGoal[0]) {
        // console.log('there is an item!');
        if (main.thisUser.dailyGoal[main.thisUser.dailyGoal.length-1].date != main.today) {
          switch(main.thisUser.dailyGoal[main.thisUser.dailyGoal.length-1].target) {
            case 'exceed': if(days.reverse()[days.length-1].calories > main.thisUser.dailyGoal[main.thisUser.dailyGoal.length-1].amount ) {
              if (main.thisUser.completedGoals[main.thisUser.completedGoals.length-1].date !== main.thisUser.dailyGoal[main.thisUser.dailyGoal.length-1].date ) {
                main.thisUser.completedGoals.push(main.thisUser.dailyGoal[main.thisUser.dailyGoal.length-1]);
              }  main.goalMessage = 'You completed your last daily goal!';
            } else {
              main.goalMessage = 'You failed to meet yesterdays daily goal!';
            }
              break;
            case 'meet': if(days.reverse()[days.length-1].calories === main.thisUser.dailyGoal[main.thisUser.dailyGoal.length-1].amount) {
              if (main.thisUser.completedGoals[main.thisUser.completedGoals.length-1].date !== main.thisUser.dailyGoal[main.thisUser.dailyGoal.length-1].date ) {
                main.thisUser.completedGoals.push(main.thisUser.dailyGoal[main.thisUser.dailyGoal.length-1]);
              }  main.goalMessage = 'You completed your last daily goal!';
            } else {
              main.goalMessage = 'You failed to meet yesterdays daily goal!';
            }
              break;
            case 'under': if(days.reverse()[days.length-1].calories < main.thisUser.dailyGoal[main.thisUser.dailyGoal.length-1].amount) {
              if (main.thisUser.completedGoals[main.thisUser.completedGoals.length-1].date !== main.thisUser.dailyGoal[main.thisUser.dailyGoal.length-1].date ) {
                main.thisUser.completedGoals.push(main.thisUser.dailyGoal[main.thisUser.dailyGoal.length-1]);
              } main.goalMessage = 'You completed your last daily goal!';
            } else {
              main.goalMessage = 'You failed to meet yesterdays daily goal!';
            }
              break;
          }
        }
      }
    }));

  }

  function clearGoal() {
    // thisUser.dailyGoal = [];
    //show form
    console.log(thisUser.dailyGoal);
    $state.reload();
  }
  main.clearGoal = clearGoal;
  checkDailyGoal();
  main.checkDailyGoal = checkDailyGoal;
}

























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
