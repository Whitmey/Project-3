const mongoose = require('mongoose');

const goalsSchema = new mongoose.Schema({
  target: { type: String, required: true },
  expiry: { type: String, required: true }
});

module.exports = mongoose.model('Goal', goalsSchema);
