const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
  date: { type: Date },
  amountspent: {type: String  },
  category: { type: String}
});

module.exports = mongoose.model('Finance', financeSchema);
