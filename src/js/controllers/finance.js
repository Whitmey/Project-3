angular.module('foodApp')
// .controller('FinancesIndexController', FinancesIndexController)
// .controller('FinancesNewController', FinancesNewController)
// .controller('FinancesShowController', FinancesShowController)
// .controller('FinancesEditController', FinancesEditController)
.controller('FinanceController', FinanceController);



FinanceController.$inject = ['Finance', '$state', '$auth'];
function FinanceController(Finance, $state) {

  const finance = this;
  // finance.getIndex = getIndex;
  // finance.newFinance = newFinance;
  // finance.showFinances = showFinances;
  finance.edit = editFinances;
  finance.create = create;
  finance.delete = financeDelete;
  finance.editFinance = {};
  finance.update = update;

  finance.all = Finance.query();


  finance.financeNew = {};


  function create() {
    Finance.save(finance.financeNew, () => {
      $state.reload();
    });
  }

  function financeDelete(financeId) {
    console.log(finance.all);

    for(var i = 0; i< finance.all.length; i++) {
      if(finance.all[i]._id === financeId)
        finance.all[i].$remove(() => {
          $state.reload();
        });
    }
  }


  function editFinances(financeId) {
    for(var i = 0; i< finance.all.length; i++) {
      if(finance.all[i]._id === financeId)
        finance.editFinance = finance.all[i];
    }
  }

  function update() {
    finance.editFinance.$update(() => {
      $state.reload();
    });
  }
}
