angular
  .module('foodApp', ['ngResource', 'ui.router', 'satellizer'])
  .config(Router)
  .config(Auth);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('foodsIndex', {
      url: '/foods',
      templateUrl: '/templates/foodsIndex.html',
      controller: 'FoodsController as foods'
    })
    .state('goalsIndex', {
      url: '/goals',
      templateUrl: '/templates/goalsIndex.html',
      controller: 'GoalsController as goals'
    })
    .state('login', {
      url: '/',
      templateUrl: '/templates/landing.html',
      controller: 'LoginController as login'
    })
    .state('register', {
      url: '/',
      templateUrl: '/templates/landing.html',
      controller: 'RegisterController as register'
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
