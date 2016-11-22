const request = require('request-promise');

const usdasSearch = (req, res) => {
  request({
    url: 'http://api.nal.usda.gov/ndb/search/',
    method: 'GET',
    qs: {
      api_key: process.env.USDA_KEY,
      format: 'json',
      sort: 'r',
      q: req.query.q,
      max: 20
    },
    json: true
  })
  .then((data) => {
    res.status(200).json(data).end();
  })
  .catch((err) => {
    res.status(500).json(err);
  });
};

const usdaInfo = (req, res) => {
  request({
    url: 'http://api.nal.usda.gov/ndb/reports/',
    method: 'GET',
    qs: {
      api_key: process.env.USDA_KEY,
      format: 'json',
      ndbno: req.query.ndbno,
      type: 'b'
    },
    json: true
  })
  .then((data) => {
    res.status(200).json(data.report.food).end();
  })
  .catch((err) => {
    res.status(500).json(err);
  });
};

module.exports = {
  search: usdasSearch,
  info: usdaInfo
};
