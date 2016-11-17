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
  foods.edit = editFoods;
  foods.create = create;
  foods.delete = foodsDelete;
  foods.editFood = {};
  foods.update = update;

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


  function editFoods(foodId) {
    for(var i = 0; i< foods.all.length; i++) {
      if(foods.all[i]._id === foodId)
        foods.editFood = foods.all[i];
    }
  }

  function update() {
    foods.editFood.$update(() => {
      $state.reload();
    });
  }
}
