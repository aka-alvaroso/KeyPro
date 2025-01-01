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
  },
  imageURL: { type: String, default: 'https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.webp' },

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
