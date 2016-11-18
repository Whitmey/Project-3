angular.module('foodApp')
// .controller('GoalsIndexController', GoalsIndexController)
// .controller('GoalsNewController', GoalsNewController)
// .controller('GoalsShowController', GoalsShowController)
// .controller('GoalsEditController', GoalsEditController)
.controller('GoalsController', GoalsController);


GoalsController.$inject = ['Goal'];
function GoalsController(Goal) {

  const goals = this;
  // goals.getIndex = getIndex;
  // goals.newGoal = newGoal;
  // goals.showGoals = showGoals;
  goals.edit = editGoals;
  goals.create = create;
  goals.delete = goalsDelete;
  goals.editGoal = {};
  goals.update = update;

  goals.all = Goal.query();


  goals.goalsNew = {};


  function create() {
    Goal.save(goals.goalsNew, () => {
      goals.all = Goal.query();
    });
    document.getElementById('createGoal').reset();
  }

  function goalsDelete(goalId) {
    // console.log(moment().weekday() );

    for(var i = 0; i< goals.all.length; i++) {
      if(goals.all[i]._id === goalId)
        goals.all[i].$remove(() => {
          goals.all = Goal.query();
        });
    }
  }


  function editGoals(goalId) {
    for(var i = 0; i< goals.all.length; i++) {
      if(goals.all[i]._id === goalId)
        goals.editGoal = goals.all[i];
    }
  }

  function update() {
    goals.editGoal.$update(() => {
      goals.all = Goal.query();
    });
  }
}
