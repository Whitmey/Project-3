angular.module('foodApp')
// .controller('FinancesIndexController', FinancesIndexController)
// .controller('FinancesNewController', FinancesNewController)
// .controller('FinancesShowController', FinancesShowController)
// .controller('FinancesEditController', FinancesEditController)
.controller('FinancesController', FinancesController);



FinancesController.$inject = ['Finance', '$state', '$auth'];
function FinancesController(Finance, $state) {

  const finances = this;
  // finance.getIndex = getIndex;
  // finance.newFinance = newFinance;
  // finance.showFinances = showFinances;
  finances.edit = editFinances;
  finances.create = create;
  finances.delete = financesDelete;
  finances.editFinance = {};
  finances.update = update;

  finances.all = Finance.query();


  finances.financesNew = {};


  function create() {
    Finance.save(finances.financesNew, () => {
      $state.reload();
    });
  }

  function financesDelete(financeId) {
    console.log(finances.all);

    for(var i = 0; i< finances.all.length; i++) {
      if(finances.all[i]._id === financeId)
        finances.all[i].$remove(() => {
          $state.reload();
        });
    }
  }


  function editFinances(financeId) {
    for(var i = 0; i< finances.all.length; i++) {
      if(finances.all[i]._id === financeId)
        finances.editFinance = finances.all[i];
    }
  }

  function update() {
    finances.editFinance.$update(() => {
      $state.reload();
    });
  }
}
