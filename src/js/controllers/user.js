angular.module('foodApp')
.controller('UsersIndexController', UsersIndexController);

UsersIndexController.$inject = ['User', '$auth'];
function UsersIndexController(User, $auth) {
  const usersIndex = this;

  User.get({ id: $auth.getPayload()._id }, (user) => {
    usersIndex.currentUser = user;
    usersIndex.all = User.query();
  });

  function follow(user) {
    usersIndex.currentUser.following.push(user);
    usersIndex.currentUser.$update(() => {
      console.log('user @\'d');
    });
  }

  function unfollow(user) {
    const i = usersIndex.currentUser.following.indexOf(user._id);
    if(i !== -1) {
      usersIndex.currentUser.following.splice(i, 1);
      usersIndex.currentUser.$update(() => {
        console.log('I can\'t belive you\'ve done this');
      });
    }
  }

  function isFollowing(user) {
    return usersIndex.currentUser.following.filter((id) => {
      return id === user._id;
    }).length;
  }

  function isSelf(user) {
    return user._id === usersIndex.currentUser._id;
  }

  usersIndex.isSelf = isSelf;
  usersIndex.isFollowing = isFollowing;

  usersIndex.follow = follow;
  usersIndex.unfollow = unfollow;
  usersIndex.filter = { username: '' };

  let data = {};
  let labels = [];
  let datapoints = [];

  function createChart() {
    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: data
    });
  }

  function dailyChart() {
    labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    datapoints = [65, 59, 80, 81, 56, 55, 40];
    chartData(labels, datapoints);
  }

  function weeklyChart() {
    labels = ['1', '2', '3', '4', '5', '6', '7'];
    datapoints = [312, 265, 470, 285, 523, 547, 342];
    chartData(labels, datapoints);
  }

  function monthlyChart() {
    labels = ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    datapoints = [1865, 1759, 2180, 2281, 1856, 1755, 1940, 2180, 2281, 1856, 1755, 1940];
    chartData(labels, datapoints);
  }

  function chartData(labels, datapoints) {
    data = {
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
    console.log('logging');
    usersIndex.createChart();
  }

  usersIndex.createChart = createChart;
  usersIndex.dailyChart = dailyChart;
  usersIndex.weeklyChart = weeklyChart;
  usersIndex.monthlyChart = monthlyChart;

  function setGoals(user) {
    user.dietGoals = user.goal;
    user.dietGoalDates = user.targetDate;
    usersIndex.currentUser.$update(() => {
      console.log('Don\'t let your dreams be dreams');
    });
  }

  usersIndex.setGoals = setGoals;
}
