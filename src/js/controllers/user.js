/* global Chart */

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


  function setGoals(user) {
    user.dietGoals = user.goal;
    user.dietGoalDates = user.targetDate;
    usersIndex.currentUser.$update(() => {
      console.log('Don\'t let your dreams be dreams');
    });
  }

  usersIndex.setGoals = setGoals;
}
