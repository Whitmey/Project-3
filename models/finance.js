const mongoose = require('mongoose');

const financesSchema = new mongoose.Schema({
  date: { type: String},
  amountSpent: {type: String},
  category: { type: String }
});

module.exports = mongoose.model('Finance', financesSchema);
