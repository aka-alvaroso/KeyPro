// /models/Test

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  player: { type: String, required: true },
  date: { type: String, required: true },
  charResults: { type: Array, required: true },
  settings: {
    mode: {
      type: String,
      enum: ['practice', 'timed', 'competitive'],
      required: true
    },
    type: {
      type: String,
      enum: ['text', 'code'],
      required: true
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true
    },
    language: { type: String, default: null, required: true },
  },
  results: {
    score: { type: Number, required: true },
    speed: { type: Number, required: true },
    accuracy: { type: Number, required: true },
    numCharacters: { type: Number, required: true },
    numErrors: { type: Number, required: true },
    time: { type: Number, required: true },
  },
}, { timestamps: true });

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
