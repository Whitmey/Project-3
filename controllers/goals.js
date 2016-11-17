const Goal = require('../models/goal');

function goalsIndex(req, res) {
  Goal.find((err, goals) => {
    if(err) return res.status(500).json({ error: err });
    return res.json(goals);
  });
}

function goalsCreate(req, res) {
  Goal.create(req.body, (err, goal) => {
    if(err) return res.status(400).json({ error: err });
    return res.json(goal);
  });
}

function goalsShow(req, res) {
  Goal.findById(req.params.id, (err, goal) => {
    if(err) return res.status(500).json({ error: err });
    if(!goal) return res.status(404).json({ error: 'Not found' });
    return res.json(goal);
  });
}

function goalsUpdate(req, res) {
  Goal.findById(req.params.id, (err, goal) => {
    if(err) return res.status(500).json({ error: err });
    if(!goal) return res.status(404).json({ error: 'Not found' });

    for(const key in req.body) {
      goal[key] = req.body[key];
    }

    goal.save((err, goal) => {
      if(err) return res.status(400).json({ error: err });
      res.json(goal);
    });
  });
}

function goalsDelete(req, res) {
  Goal.findById(req.params.id, (err, goal) => {
    if(err) return res.status(500).json({ error: err });
    if(!goal) return res.status(404).json({ error: 'Not found' });

    goal.remove(err => {
      if(err) return res.status(500).json({ error: err });
      res.status(204).send();
    });
  });
}

module.exports = {
  index: goalsIndex,
  create: goalsCreate,
  show: goalsShow,
  update: goalsUpdate,
  delete: goalsDelete
};
