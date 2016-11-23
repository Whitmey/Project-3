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
  main.proteinCounter = 0;
  main.carbCounter = 0;
  main.fatCounter = 0;
  main.allMyFoods = [];
  main.today = moment().format('DD/MM/YYYY');

  main.thisUser = null;

  function logout() {
    $auth.logout();
    $state.go('landing');
  }

  main.logout = logout;

  function getUser() {
    const payload = $auth.getPayload();
    if(payload) {
      User.get({ id: $auth.getPayload()._id }, (user) => {
        main.thisUser = user;
        checkDailyGoal();
      });
    }
  }

  getUser();

  let days = [];

  //this function checks if items in users foods were eaten on this weekday and adds up calories for just those items.
  function todaysCals() {
    main.caloryCounter = 0;
    main.proteinCounter = 0;
    main.carbCounter = 0;
    main.fatCounter = 0;
    for(let i=0; i<main.thisUser.eaten.length; i++) {
      if (main.thisUser.eaten[i].date === main.today){
        main.caloryCounter += main.thisUser.eaten[i].kcal;
        main.proteinCounter += main.thisUser.eaten[i].protein;
        main.carbCounter += main.thisUser.eaten[i].carbs;
        main.fatCounter += main.thisUser.eaten[i].fat;
      }
    }
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

  //function to populate a MONTHS worth of objects with dates and calories. they will update each day.
  function getDays() {
    days = [];
    for (let day=1; day<28; day ++) {
      days.push( {
        date: moment().subtract(day, 'days').format('DD/MM/YYYY'),
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      });
    }
    getCalories();
  }

  function getCalories() {
    for (let i=0; i<days.length; i++) {
      for (let k = 0; k< main.thisUser.eaten.length; k++) {
        if(main.thisUser.eaten[k].date === days[i].date) {
          days[i].calories += main.thisUser.eaten[k].kcal;
          days[i].protein += main.thisUser.eaten[k].protein;
          days[i].carbs += main.thisUser.eaten[k].carbs;
          days[i].fat += main.thisUser.eaten[k].fat;
        }
      }
    }
  }
  main.createChart = createChart;






  main.canShowCanvas = true;

  let labels = [];
  let datapoints = [];
  let datapoints2 = [];
  let datapoints3 = [];
  let datapoints4 = [];
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
    datapoints2 = [main.proteinCounter, main.proteinCounter, main.proteinCounter];
    datapoints3 = [main.carbCounter, main.carbCounter, main.carbCounter];
    datapoints4 = [main.fatCounter, main.fatCounter, main.fatCounter];
    // datapoints2 =
    chartData(labels, datapoints, datapoints2, datapoints3, datapoints4);
  }

  function weeklyChart() {
    todaysCals();
    getDays();
    labels = [];
    datapoints = [];
    datapoints2 = [];
    datapoints3 = [];
    datapoints4 = [];
    for (let i=0; i<6; i++) {
      console.log(days[1]);
      labels.push(days[i].date);
      datapoints.push(days[i].calories);
      datapoints2.push(days[i].protein);
      datapoints3.push(days[i].carbs);
      datapoints4.push(days[i].fat);
    }
    labels.reverse();
    datapoints.reverse();
    datapoints2.reverse();
    datapoints3.reverse();
    datapoints4.reverse();
    labels.push('Today');
    datapoints.push(main.caloryCounter);
    datapoints2.push(main.proteinCounter);
    datapoints3.push(main.carbCounter);
    datapoints4.push(main.fatCounter);
    chartData(labels, datapoints, datapoints2, datapoints3, datapoints4);
  }

  function monthlyChart() {
    todaysCals();
    getDays();
    labels = [];
    datapoints = [];
    datapoints2 = [];
    datapoints3 = [];
    datapoints4 = [];
    for (let i=0; i<days.length; i++) {
      labels.push(days[i].date);
      datapoints.push(days[i].calories);
      datapoints2.push(days[i].protein);
      datapoints3.push(days[i].carbs);
      datapoints4.push(days[i].fat);
    }
    labels.reverse();
    datapoints.reverse();
    datapoints2.reverse();
    datapoints3.reverse();
    datapoints4.reverse();
    labels.push('Today');
    datapoints.push(main.caloryCounter);
    datapoints2.push(main.proteinCounter);
    datapoints3.push(main.carbCounter);
    datapoints4.push(main.fatCounter);
    chartData(labels, datapoints, datapoints2, datapoints3, datapoints4);
  }

  function chartData(labels, datapoints, datapoints2, datapoints3, datapoints4) {
    console.log(datapoints, datapoints2, datapoints3, datapoints4);
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Calories',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(255,255,0,0.4)',
          borderColor: 'rgba(255,255,0,0.4)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(255,255,0,0.4)',
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
        },
        {
          label: 'Protein',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(0,0,255,0.4)',
          borderColor: 'rgba(0,0,255,0.4)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(0,0,255,0.4)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(0,0,255,0.4)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: datapoints2,
          spanGaps: false
        },
        {
          label: 'Carbohydrates',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(0,255,0,0.4)',
          borderColor: 'rgba(0,255,0,0.4)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(0,255,0,0.4)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(0,255,0,0.4)',
          pointHoverBorderColor: 'rgba(0,255,0,0.4)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: datapoints3,
          spanGaps: false
        },
        {
          label: 'Fat',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(255,0,0,0.4)',
          borderColor: 'rgba(255,0,0,0.4)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(255,0,0,0.4)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(255,0,0,0.4)',
          pointHoverBorderColor: 'rgba(255,0,0,0.4)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: datapoints4,
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
      main.goalMessage = 'Goal set!';
    });
  }
  main.setDailyGoal = setDailyGoal;
  main.goalMessage = '';


  function checkDailyGoal() {
    todaysCals();
    getDays();

    if(main.thisUser.completedGoals === undefined) {
      main.thisUser.completedGoals = 0;
    }
    if (main.thisUser.dailyGoal[0]) {
      // console.log('there is an item!');
      if (main.thisUser.dailyGoal[main.thisUser.dailyGoal.length-1].date !== main.today) {
        switch(main.thisUser.dailyGoal[main.thisUser.dailyGoal.length-1].target) {
          case 'exceed': if(days.reverse()[days.length-1].calories > main.thisUser.dailyGoal[main.thisUser.dailyGoal.length-1].amount ) {
            if (main.thisUser.completedGoals[main.thisUser.completedGoals.length-1].date !== main.thisUser.dailyGoal[main.thisUser.dailyGoal.length-1].date ) {
              main.thisUser.completedGoals.push(main.thisUser.dailyGoal[main.thisUser.dailyGoal.length-1]);
            }  main.goalMessage = 'You completed your last daily goal!';
          } else {
            main.goalMessage = 'You didn\'t quite meet yesterday\'s goal, better luck today!';
          }
            break;
          case 'meet': if(days.reverse()[days.length-1].calories === main.thisUser.dailyGoal[main.thisUser.dailyGoal.length-1].amount) {
            if (main.thisUser.completedGoals[main.thisUser.completedGoals.length-1].date !== main.thisUser.dailyGoal[main.thisUser.dailyGoal.length-1].date ) {
              main.thisUser.completedGoals.push(main.thisUser.dailyGoal[main.thisUser.dailyGoal.length-1]);
            }  main.goalMessage = 'You completed your last daily goal!';
          } else {
            main.goalMessage = 'You didn\'t quite meet yesterday\'s goal, better luck today!';
          }
            break;
          case 'under': if(days.reverse()[days.length-1].calories < main.thisUser.dailyGoal[main.thisUser.dailyGoal.length-1].amount) {
            if (main.thisUser.completedGoals[main.thisUser.completedGoals.length-1].date !== main.thisUser.dailyGoal[main.thisUser.dailyGoal.length-1].date ) {
              main.thisUser.completedGoals.push(main.thisUser.dailyGoal[main.thisUser.dailyGoal.length-1]);
            } main.goalMessage = 'You completed your last daily goal!';
          } else {
            main.goalMessage = 'You didn\'t quite meet yesterday\'s goal, better luck today!';
          }
            break;
        }
      }
    }
  }

  function clearGoal() {

    console.log(main.thisUser.dailyGoal);
    $state.reload();
  }
  main.clearGoal = clearGoal;
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
