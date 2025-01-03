// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000', // Asegúrate de que este sea el puerto donde corre tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
