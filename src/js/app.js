angular
  .module('foodApp', ['ngResource', 'ui.router', 'satellizer', 'angularMoment'])
  .config(Router)
  .config(Auth);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('foodsIndex', {
      url: '/foods',
      templateUrl: '/templates/foodsindex.html',
      controller: 'FoodsController as foods'
    })
    .state('leaderboard', {
      url: '/leaderboard',
      templateUrl: '/templates/leaderboard.html',
      controller: 'UsersIndexController as usersIndex'
    })
    .state('landing', {
      url: '/',
      templateUrl: '/templates/landing.html'
    })
    .state('select', {
      url: '/select',
      templateUrl: '/templates/select.html'
    })
    .state('dietProfile', {
      url: '/dietProfile',
      templateUrl: '/templates/dietProfile.html'
    })
    .state('dietFriends', {
      url: '/dietFriends',
      templateUrl: '/templates/dietFriends.html',
      controller: 'UsersIndexController as usersIndex'
    })
    .state('finances', {
      url: '/finances',
      templateUrl: '/templates/finances.html',
      controller: 'FinancesController as finances'
    })
    .state('picturesBefore', {
      url: '/pictures/before',
      templateUrl: '/templates/picturesBefore.html',
      controller: 'PicturesBeforeController as picturesBefore'
    })
    .state('picturesAfter', {
      url: '/pictures/after',
      templateUrl: '/templates/picturesAfter.html',
      controller: 'PicturesAfterController as picturesAfter'
    });
  $urlRouterProvider.otherwise('/');
}

Auth.$inject = ['$authProvider'];
function Auth($authProvider) {
  $authProvider.loginUrl = '/login';
  $authProvider.signupUrl = '/register';

  $authProvider.tokenPrefix = '';

  $authProvider.facebook({
    clientId: '1308530975838362'
  });

}
