angular.module('foodApp')
  .controller('financeMainController', financeMainController);


financeMainController.$inject = ['moment','Finance','User','$auth', '$state', '$rootScope'];
function financeMainController(moment, $auth, $state, Finance, $rootScope) {
  const main = this;

  main.isLoggedIn = $auth.isAuthenticated;
  main.message = null;
  main.todaysAmount= todaysAmount;
  main.allFinance = Finance.query();
  main.yesterdayCounter = 0;
  main.amountCounter = 0;
  main.allMyFinances = [];
  main.today = moment().format('DD/MM/YYYY');

  const thisUser = User.get({ id: $auth.getPayload()._id });

  function getFinances() {
    main.amountCounter = 0;
    main.allMyFinances = [];
    for(let j=0; j<main.allFinance.length; j++) {
      if(thisUser.spent.indexOf(main.allFinance[j]._id) !== -1) {
        main.allMyFinances.push(main.allMyFinance[j]);
      }
    }
  }
  function todaysAmount() {
    getFinances();
    //should turn this into a switch statement v
    for(let i=0; i<main.allMyFinances.length; i++) {
      if (main.allMyFinances[i].date == main.today){
        main.amountCounter += main.allMyFinances[i].amount;
      }
      else if (main.allMyFinances[i].date == moment().subtract(1, 'days').format('DD/MM/YYYY')) {
        main.yesterdayCounter += main.allMyFinances[i].amount;
      }
    }
    console.log(main.allMyFinances);
  }


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

  let days = [];
  function getDays() {
    days = [];
    for (let day=1; day<7; day ++) {
      days.push( {
        date: moment().subtract(day, 'days').format('DD/MM/YYYY'),
        amount: 0
      });
    }
    getAmount();
    console.log(days);
  }
  function getAmount() {
    for (let i=0; i<days.length; i++) {
      for (let k = 0; k< main.allMyFinances.length; k++) {
        if(main.allMyFinances[k].date === days[i].date) {
          days[i].amount += main.allMyFinances[k].amount;
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

    const chartElement = document.getElementById('myChart1');

    if (chart && chart.destroy) {
      chart.destroy();
    }
    chart = new Chart(chartElement, {
      type: 'line',
      data: data
    });
  }

  function dailyChart() {
    todaysAmount();
    getDays();
    labels = ['Entertanment', 'Food', 'Utilities', 'Rent', 'Car'];
    datapoints = [12, 30, 200, 20, 50];
    chartData(labels, datapoints);
  }
  function weeklyChart() {
    todaysAmount();
    getDays();
    labels = [days[5].date, days[4].date, days[3].date, days[2].date, days[1].date, days[0].date, 'Today'];
    datapoints = [days[5].amount, days[4].amount, days[3].amount, days[2].amount, days[1].amount, days[0].amount, main.amountCounter];
    chartData(labels, datapoints);
  }
  function monthlyChart() {
    todaysAmount();
    getDays();
    labels = [];
    datapoints = [];
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
