angular.module('foodApp')
  .controller('RegisterController', RegisterController)
  .controller('LoginController', LoginController);

RegisterController.$inject = ['$auth', '$state'];
function RegisterController($auth, $state) {
  const register = this;

  register.user = {};

  function submit() {
    $auth.signup(register.user)
    .then(() => {
      $state.go('login');
    });
  }
  register.submit = submit;
}

LoginController.$inject = ['$auth', '$state'];
function LoginController($auth, $state) {
  console.log('submitted');
  const login = this;

  login.credentials = {};

  function submit() {
    $auth.login(login.credentials)
    .then(() => {
      $state.go('foodsIndex');
    });
  }

  function authenticate(provider) {
    $auth.authenticate(provider)
    .then(() => {
      // console.log(res);
      $state.go('foodsIndex');
    });
  }
  login.submit = submit;
  login.authenticate = authenticate;
}
