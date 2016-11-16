angular.module('foodApp')
  .controller('FoodsIndexController', FoodsIndexController);


FoodsIndexController.$inject = ['Food'];
function FoodsIndexController(Food){
  const foodsIndex = this;

  foodsIndex.all = Food.query();
}
FoodsNewController.$inject = ['Food', '$state'];
function FoodsNewController(Food, $state) {
  const foodsNew = this;

  foodsNew.food = {};

  function create() {
    Food.save(foodsNew.food, () => {
      $state.go('foodsIndex');
    });
  }
  foodsNew.create = create;
}
FoodsShowController.$inject = ['Food', '$state', '$auth'];
function FoodsShowController(Food, $state, $auth) {
  const foodsShow = this;

  foodsShow.food = Food.get($state.params);

  function deleteFood() {
    foodsShow.food.$remove(() => {
      $state.go('foodsIndex');
    });
  }

  foodsShow.delete = deleteFood;
  foodsShow.isLoggedIn = $auth.isAuthenticated;
}

FoodsEditController.$inject = ['Food', '$state'];
function FoodsEditController(Food, $state) {
  const foodsEdit = this;

  foodsEdit.food = Food.get($state.params);

  function update() {
    foodsEdit.food.$update(() => {
      $state.go('foodsShow', $state.params);
    });
  }

  this.update = update;

}
