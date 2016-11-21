angular.module('foodApp')
  .controller('PicturesBeforeController', PicturesBeforeController)
  .controller('PicturesAfterController', PicturesAfterController);

PicturesBeforeController.$inject = ['User', '$auth', '$state'];
function PicturesBeforeController(User, $auth, $state) {

  const picturesBefore = this;

  User.get({ id: $auth.getPayload()._id }, (user) => {
    picturesBefore.user = user;
  });

  function save() {
    User.update({ id: picturesBefore.user._id, image: 'before' }, picturesBefore.user, () => {
      $state.go('dietProfile');
    });
  }

  picturesBefore.save = save;
}

PicturesAfterController.$inject = ['User', '$auth', '$state'];
function PicturesAfterController(User, $auth, $state) {

  const picturesAfter = this;

  User.get({ id: $auth.getPayload()._id }, (user) => {
    picturesAfter.user = user;
  });

  function save() {
    User.update({ id: picturesAfter.user._id, image: 'after' }, picturesAfter.user, () => {
      $state.go('dietProfile');
    });
  }

  picturesAfter.save = save;
}
