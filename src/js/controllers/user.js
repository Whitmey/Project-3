/* global Chart */

angular.module('foodApp')
.controller('UsersIndexController', UsersIndexController);

UsersIndexController.$inject = ['User', '$auth', 'moment'];
function UsersIndexController(User, $auth, moment) {
  const usersIndex = this;

  usersIndex.thisUser = User.get({ id: $auth.getPayload()._id });


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
  usersIndex.dailyGoal = {};
  usersIndex.dailyGoal.date = moment().format('DD/MM/YYYY');



  function setDailyGoal() {
    usersIndex.currentUser.dailyGoal = [ {
      amount: usersIndex.dailyGoal.amount,
      target: usersIndex.dailyGoal.target,
      date: usersIndex.dailyGoal.date
    } ];
    console.log(usersIndex.dailyGoal);
    usersIndex.currentUser.$update(() => {
      console.log('Don\'t let your dreams be dreams', usersIndex.currentUser.dailyGoal, usersIndex.currentUser);
    });
  }
  usersIndex.setDailyGoal = setDailyGoal;

  checkDailyGoal();

  function checkDailyGoal() {

    if(usersIndex.thisUser.completedGoals === undefined) {
      usersIndex.thisUser.completedGoals = 0;
    }
    console.log(usersIndex.thisUser.completedGoals);
    if (usersIndex.thisUser.dailyGoal.date !== moment().format('DD/MM/YYYY')) {


      
      // usersIndex.thisUser.completedGoals ++;
    }
  }
  usersIndex.checkDailyGoal = checkDailyGoal;
}
