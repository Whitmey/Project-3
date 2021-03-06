angular.module('foodApp')
  .controller('FinancesController', FinancesController)
  .controller('financeMainController', financeMainController);

FinancesController.$inject = ['Finance', '$state', '$auth'];
let budget = 500;
function FinancesController(Finance, $state) {

  const finances = this;
  finances.edit = editFinances;
  finances.create = create;
  finances.delete = financesDelete;
  finances.editFinance = {};
  finances.update = update;

  finances.all = Finance.query();

  finances.financesNew = {};

  function create() {
    Finance.save(finances.financesNew, () => {
      const amountSpent = finances.financesNew.amountSpent;
      budget -= amountSpent;
      console.log(budget);
      budget = document.getElementById('budgetText').innerHTML;
      console.log(budget);
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

financeMainController.$inject = ['$auth', '$state', '$rootScope', 'Finance'];
function financeMainController($auth, $state, $rootScope, Finance) {
  const main = this;

  main.isLoggedIn = $auth.isAuthenticated;
  main.message = null;
  main.setDatapoints = setDatapoints;

  const datapoints = [0, 0, 0, 0, 0];

  Finance.query((res) => {
    main.all = res;
    setDatapoints();
  });


  function setDatapoints() {
    for (var i=0;i<main.all.length;i++) {
      if (main.all[i].category.toLowerCase() === 'entertainment') {
        datapoints[0] += parseInt(main.all[i].amountSpent);
      } else if (main.all[i].category.toLowerCase() === 'food') {
        datapoints[1] += parseInt(main.all[i].amountSpent);
      } else if (main.all[i].category.toLowerCase() === 'utilities') {
        datapoints[2] += parseInt(main.all[i].amountSpent);
      } else if (main.all[i].category.toLowerCase() === 'rent') {
        datapoints[3] += parseInt(main.all[i].amountSpent);
      } else if (main.all[i].category.toLowerCase() === 'other') {
        datapoints[4] += parseInt(main.all[i].amountSpent);
      }
    }
    createChart();
  }

  const protectedStates = [];

  function secureState(e, toState) {
    main.message = null;
    if(!$auth.isAuthenticated() && protectedStates.includes(toState.name)) {
      e.preventDefault();
      $state.go('login');
      main.message = 'You need to login to see that!';
    }
  }

  $rootScope.$on('stateChangeStart', secureState);

  function createChart() {
    console.log(datapoints);
    const ctx = document.getElementById('myChart1');
    const myChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Entertainment', 'Food', 'Utilities', 'Rent', 'Other' ],
        datasets: [{
          label: 'Money Spent',
          data: datapoints,
          backgroundColor: [
            'rgba(0, 166, 251, 0.3)'
          ],
          borderColor: [
            'rgba(0,166,251,1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    });
  }
}
