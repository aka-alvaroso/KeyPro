// models/User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  stats: {
    totalTests: { type: Number, default: 0 },
    numCharacters: { type: Number, default: 0 },
    numErrors: { type: Number, default: 0 },
    avgAccuracy: { type: Number, default: 0 },
    avgSpeed: { type: Number, default: 0 },
    bestSpeed: { type: Number, default: 0 },
    avgScore: { type: Number, default: 0 },
    bestScore: { type: Number, default: 0 },
    numEasyTests: { type: Number, default: 0 },
    numMediumTests: { type: Number, default: 0 },
    numHardTests: { type: Number, default: 0 },
  }

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
