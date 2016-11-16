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
      controller: 'FoodsIndexController as foodsIndex'
    })
    .state('foodsNew', {
      url: '/foods/new',
      templateUrl: '/templates/foodsNew.html',
      controller: 'FoodsNewController as foodsNew'
    })
    .state('foodsShow', {
      url: '/foods/:id',
      templateUrl: '/templates/foodsShow.html',
      controller: 'FoodsShowController as foodsShow'
    })
    .state('foodsEdit', {
      url: '/foods/:id/edit',
      templateUrl: '/templates/foodsEdit.html',
      controller: 'FoodsEditController as foodsEdit'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: 'RegisterController as register'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'LoginController as login'
    });




  $urlRouterProvider.otherwise('/foods');
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
