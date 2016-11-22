const mongoose = require('mongoose');

const foodsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  kcal: { type: Number, required: true },
  date: { type: String, required: true }
});

module.exports = mongoose.model('Food', foodsSchema);
