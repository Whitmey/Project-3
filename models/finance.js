const mongoose = require('mongoose');

const financesSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now},
  amountSpent: {type: String  },
  category: { type: String }
});

module.exports = mongoose.model('Finance', financesSchema);
