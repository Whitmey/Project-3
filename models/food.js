const mongoose = require('mongoose');

const foodsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number, required: true }
  // date: { type: Date, required: true }
});

module.exports = mongoose.model('Food', foodsSchema);
