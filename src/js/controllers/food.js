angular.module('foodApp')
  .controller('FoodsController', FoodsController);

FoodsController.$inject = ['Food', 'User', '$auth', '$state', 'moment', 'Usda'];
function FoodsController(Food, User, $auth, $state, moment, Usda) {

  const foods = this;

  foods.searchTerm = '';
  foods.searchResults = [];
  foods.ndbno = '';
  foods.infoResults = [];

  foods.search = search;
  foods.addFood = addFood;
  foods.create = create;

  foods.update = update;
  foods.foodsNew = {};
  foods.foodsNew.date = moment().format('DD/MM/YYYY');

  const thisUser = User.get({ id: $auth.getPayload()._id });

  Food.query((res) => {
    foods.all = res;
    thisUser.$update();
  });

  function search() {
    foods.searchResults = [];
    Usda.search(foods.searchTerm).then(
      (searchResults) => {
        if (searchResults.data.list) {
          foods.searchResults = searchResults.data.list.item;
        }
      }
    );
  }

  function addFood(ndbno) {
    foods.infoResults = [];
    Usda.itemInfo(ndbno).then(
      (infoResults) => {
        foods.foodsNew.kcal = infoResults.data.nutrients.filter((item) => {
          console.log(item);
          return item.unit === 'kcal';
        })[0].value;
        foods.foodsNew.protein = infoResults.data.nutrients.filter((item) => {
          console.log(item);
          return item.name === 'Protein';
        })[0].value;
        foods.foodsNew.name = infoResults.data.name;
        create();
      }
    );
  }

  function create() {
    console.log(foods.foodsNew);
    Food.save(foods.foodsNew, () => {
      Food.query((res) => {
        foods.all = res;
        thisUser.$update();
        thisUser.eaten.push(foods.all[foods.all.length-1]);
        console.log(thisUser);
      });
    });
  }

  function update() {
    foods.editFood.$update(() => {
      foods.all = Food.query();
    });
  }
}
