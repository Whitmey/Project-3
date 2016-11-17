angular.module('foodApp')
// .controller('FoodsIndexController', FoodsIndexController)
// .controller('FoodsNewController', FoodsNewController)
// .controller('FoodsShowController', FoodsShowController)
// .controller('FoodsEditController', FoodsEditController)
.controller('FoodsController', FoodsController);



FoodsController.$inject = ['Food', '$state', '$auth'];
function FoodsController(Food, $state) {

  const foods = this;
  // foods.getIndex = getIndex;
  // foods.newFood = newFood;
  // foods.showFoods = showFoods;
  foods.editFoods = editFoods;
  foods.create = create;
  foods.delete = foodsDelete;


  foods.all = Food.query();


  foods.foodsNew = {};

  function create() {
    Food.save(foods.foodsNew, () => {
      $state.reload();
    });
  }

  function foodsDelete(foodId) {
    console.log(foods.all);

    for(var i = 0; i< foods.all.length; i++) {
      if(foods.all[i]._id === foodId)
        foods.all[i].$remove(() => {
          $state.reload();
        });
    }
  }


  function editFoods(Food, $state) {
    const foodsEdit = this;

    foodsEdit.food = Food.get($state.params);

    function update() {
      foodsEdit.food.$update(() => {
        $state.go('foodsShow', $state.params);
      });
    }

    this.update = update;

  }

}
