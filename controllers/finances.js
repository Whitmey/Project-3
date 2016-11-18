const Finance = require('../models/finance');

function financesIndex(req, res) {
  Finance.find((err, finances) => {
    if(err) return res.status(500).json({ error: err });
    return res.json(finances);
  });
}

function financesCreate(req, res) {
  Finance.create(req.body, (err, finance) => {
    if(err) return res.status(400).json({ error: err });
    return res.json(finance);
  });
}

function financesShow(req, res) {
  Finance.findById(req.params.id, (err, finance) => {
    if(err) return res.status(500).json({ error: err });
    if(!finance) return res.status(404).json({ error: 'Not found' });
    return res.json(finance);
  });
}

function financesUpdate(req, res) {
  Finance.findById(req.params.id, (err, finance) => {
    if(err) return res.status(500).json({ error: err });
    if(!finance) return res.status(404).json({ error: 'Not found' });

    for(const key in req.body) {
      finance[key] = req.body[key];
    }

    finance.save((err, finance) => {
      if(err) return res.status(400).json({ error: err });
      res.json(finance);
    });
  });
}

function financesDelete(req, res) {
  Finance.findById(req.params.id, (err, finance) => {
    if(err) return res.status(500).json({ error: err });
    if(!finance) return res.status(404).json({ error: 'Not found' });

    finance.remove(err => {
      if(err) return res.status(500).json({ error: err });
      res.status(204).send();
    });
  });
}

module.exports = {
  index: financesIndex,
  create: financesCreate,
  show: financesShow,
  update: financesUpdate,
  delete: financesDelete
};
