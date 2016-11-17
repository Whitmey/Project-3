angular.module('foodApp')
  .controller('UsersIndexController', UsersIndexController);

UsersIndexController.$inject = ['User'];
function UsersIndexController(User) {
  console.log('controller working');
  const usersIndex = this;

  usersIndex.all = User.query();
}
