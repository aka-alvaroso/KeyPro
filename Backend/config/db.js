// /config/db.js
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully to Atlas');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Detener el proceso si la conexión falla
  }
};

module.exports = connectDB;
