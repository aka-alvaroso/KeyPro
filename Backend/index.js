// index.js
const express = require('express');
const app = express();
const textRoutes = require('./routes/textRoutes');
const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/testRoutes');
const rankingRoutes = require('./routes/rankingRoutes');
const connectDB = require('./config/db');
const cors = require('cors');

// Conexión a MongoDB
connectDB();

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'username'],
};

app.use(cors(corsOptions));

app.use(express.json());

// Autenticación
app.use('/user', userRoutes);

app.use('/text', textRoutes);

app.use('/test', testRoutes);

app.use('/ranking', rankingRoutes);



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
