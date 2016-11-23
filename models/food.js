const mongoose = require('mongoose');

const foodsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  kcal: { type: Number, required: true },
  protein: {type: Number},
  carbs: {type: Number},
  fat: {type: Number},
  date: { type: String, required: true }
});

module.exports = mongoose.model('Food', foodsSchema);
