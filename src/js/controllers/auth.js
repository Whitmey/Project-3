angular.module('foodApp')
  .controller('RegisterController', RegisterController)
  .controller('LoginController', LoginController);

RegisterController.$inject = ['$auth', '$state'];
function RegisterController($auth, $state) {
  const register = this;
  register.user = {};
  register.regButtonText = 'Register';
  function submit() {
    console.log(register.user);
    $auth.signup(register.user)
    .then(() => {
      register.regButtonText = 'Registered';
      $state.go('landing');
    });
  }
  register.submit = submit;
}

LoginController.$inject = ['$auth', '$state'];
function LoginController($auth, $state) {
  const login = this;
  login.credentials = {};
  function submit() {
    // console.log(login.credentials);
    $auth.login(login.credentials)
    .then(() => {
      $state.go('select');
    });
  }
  function authenticate(provider) {
    $auth.authenticate(provider)
    .then(() => {
      // console.log(res);
      $state.go('select');
    });
  }
  login.submit = submit;
  login.authenticate = authenticate;
}
