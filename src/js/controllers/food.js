angular.module('foodApp')
// .controller('FoodsIndexController', FoodsIndexController)
// .controller('FoodsNewController', FoodsNewController)
// .controller('FoodsShowController', FoodsShowController)
// .controller('FoodsEditController', FoodsEditController)
.controller('FoodsController', FoodsController);



FoodsController.$inject = ['Food', 'User', '$auth', '$state', 'moment'];
function FoodsController(Food, User, $auth, $state, moment) {

  const foods = this;
  foods.edit = editFoods;
  foods.create = create;
  foods.delete = foodsDelete;
  foods.editFood = {};
  foods.update = update;
  foods.foodsNew = {};
  foods.foodsNew.date = moment().format('DD/MM/YYYY');

  const thisUser = User.get({ id: $auth.getPayload()._id });

  Food.query((res) => {
    foods.all = res;
    thisUser.$update();
  });

  function create() {
    Food.save(foods.foodsNew, () => {
      Food.query((res) => {
        foods.all = res;
        thisUser.$update();
        thisUser.eaten.push(foods.all[foods.all.length-1]);
        console.log(thisUser);
      });
      document.getElementById('createFood').reset();
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
    thisUser.$update();
    console.log(thisUser);
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
