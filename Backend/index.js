// index.js
const express = require('express');
const app = express();
const textRoutes = require('./routes/textRoutes');
const connectDB = require('./config/db');
const cors = require('cors');

// Conexión a MongoDB
connectDB();

app.use(cors());

app.use(express.json());

// Autenticación
app.use('/text', textRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
