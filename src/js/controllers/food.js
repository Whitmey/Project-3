angular.module('foodApp')
// .controller('FoodsIndexController', FoodsIndexController)
// .controller('FoodsNewController', FoodsNewController)
// .controller('FoodsShowController', FoodsShowController)
// .controller('FoodsEditController', FoodsEditController)
.controller('FoodsController', FoodsController);



FoodsController.$inject = ['Food', 'User', '$auth', '$state'];
function FoodsController(Food, User, $auth, $state) {

  const foods = this;
  foods.edit = editFoods;
  foods.create = create;
  foods.delete = foodsDelete;
  foods.editFood = {};
  foods.update = update;
  foods.foodsNew = {};

  const thisUser = User.get({ id: $auth.getPayload()._id });

  foods.all = Food.query();


  function create() {
    Food.save(foods.foodsNew, () => {
      $state.reload();
      console.log(foods);
    });
    Food.query((res) => {
      foods.all = res;
      thisUser.eaten.push(foods.all[foods.all.length-1]);
      thisUser.$update();
      console.log(thisUser);
    });
  }

  function foodsDelete(foodId) {
    // console.log(foods.all);

    for(var i = 0; i< foods.all.length; i++) {
      if(foods.all[i]._id === foodId)
        foods.all[i].$remove(() => {
          foods.all = Food.query();
        });
      const j = thisUser.eaten.indexOf(foodId);
      if (j !== -1) {
        thisUser.eaten.splice(j, 1);
      }
    }
    thisUser.$update();
    console.log(thisUser);
  }




  function editFoods(foodId) {
    for(var i = 0; i< foods.all.length; i++) {
      if(foods.all[i]._id === foodId)
        foods.editFood = foods.all[i];
    }
  }

  function update() {
    foods.editFood.$update(() => {
      foods.all = Food.query();
    });
  }




}
