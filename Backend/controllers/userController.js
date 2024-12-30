// /controllers/userController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const newUser = new User({
      username,
      email,
      password: bcrypt.hashSync(password, 10),
    });

    const savedUser = await newUser.save();
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, user: savedUser });

  } catch (e) {
    console.error('Error al guardar el usuario:', e);
    res.status(500).json({ message: 'Error al guardar el usuario', e });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const user = await User.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user });

  } catch (e) {
    console.error('Error al autenticar el usuario:', e);
    res.status(500).json({ message: 'Error al autenticar el usuario', e });
  }
};

const updateStats = async (req, res) => {
  const updateStats = async (req, res) => {

    try {
      const { email, stats, test } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const newStats = {
        avgAccuracy: Math.trunc(((user.stats.avgAccuracy * user.stats.totalTests + stats.accurate) / (user.stats.totalTests + 1)) * 10) / 10,
        avgScore: Math.trunc(((user.stats.avgScore * user.stats.totalTests + stats.score) / (user.stats.totalTests + 1)) * 10) / 10,
        avgSpeed: Math.trunc(((user.stats.avgSpeed * user.stats.totalTests + stats.cpm) / (user.stats.totalTests + 1)) * 10) / 10,

        bestScore: Math.max(user.stats.bestScore, stats.score),
        bestSpeed: Math.max(user.stats.bestSpeed, stats.cpm),
        numCharacters: user.stats.numCharacters + stats.totalChar,
        numErrors: user.stats.numErrors + stats.errors,
        numEasyTests: test.difficulty === 'easy' ? user.stats.numEasyTests + 1 : user.stats.numEasyTests,
        numMediumTests: test.difficulty === 'medium' ? user.stats.numMediumTests + 1 : user.stats.numMediumTests,
        numHardTests: test.difficulty === 'hard' ? user.stats.numHardTests + 1 : user.stats.numHardTests,
        totalTests: user.stats.totalTests + 1
      };

      user.stats = newStats;

      await user.save();

      res.status(200).json({ message: 'Estadísticas actualizadas correctamente' });
      res.status(200).json({ message: 'Estadísticas actualizadas correctamente' });
    } catch (e) {
      console.error('Error al editar el usuario:', e);
      res.status(500).json({ message: 'Error al editar el usuario', e });
    }

  }

  const getUserData = async (req, res) => {
    try {
      const { username } = req.headers;

      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.status(200).json({ user });

    } catch (e) {
      console.error('Error al obtener el usuario:', e);
      res.status(500).json({ message: 'Error al obtener el usuario', e });
    }
  }

  const getUserData = async (req, res) => {
    try {
      const { username } = req.headers;

      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.status(200).json({ user });

    } catch (e) {
      console.error('Error al obtener el usuario:', e);
      res.status(500).json({ message: 'Error al obtener el usuario', e });
    }
  }

  const deleteUser = async (req, res) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      await user.remove();

      res.status(204).json({ message: 'Usuario eliminado correctamente' });

    } catch (e) {
      console.error('Error al eliminar el usuario:', e);
      res.status(500).json({ message: 'Error al eliminar el usuario', e });
    }

  }


  module.exports = {
    registerUser,
    loginUser,
    updateStats,
    getUserData,
    updateStats,
    getUserData,
    deleteUser
  };



