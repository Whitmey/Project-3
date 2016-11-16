const Food = require('../models/food');

function foodsIndex(req, res) {
  Food.find((err, foods) => {
    if(err) return res.status(500).json({ error: err });
    return res.json(foods);
  });
}

function foodsCreate(req, res) {
  Food.create(req.body, (err, food) => {
    if(err) return res.status(400).json({ error: err });
    return res.json(food);
  });
}

function foodsShow(req, res) {
  Food.findById(req.params.id, (err, food) => {
    if(err) return res.status(500).json({ error: err });
    if(!food) return res.status(404).json({ error: 'Not found' });
    return res.json(food);
  });
}

function foodsUpdate(req, res) {
  Food.findById(req.params.id, (err, food) => {
    if(err) return res.status(500).json({ error: err });
    if(!food) return res.status(404).json({ error: 'Not found' });

    for(const key in req.body) {
      food[key] = req.body[key];
    }

    food.save((err, food) => {
      if(err) return res.status(400).json({ error: err });
      res.json(food);
    });
  });
}

function foodsDelete(req, res) {
  Food.findById(req.params.id, (err, food) => {
    if(err) return res.status(500).json({ error: err });
    if(!food) return res.status(404).json({ error: 'Not found' });

    food.remove(err => {
      if(err) return res.status(500).json({ error: err });
      res.status(204).send();
    });
  });
}

module.exports = {
  index: foodsIndex,
  create: foodsCreate,
  show: foodsShow,
  update: foodsUpdate,
  delete: foodsDelete
};
