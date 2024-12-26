// /controllers/userController.js
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    console.log(username, email, password);

    const newUser = new User({
      username,
      email,
      password,
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

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user });

  } catch (e) {
    console.error('Error al autenticar el usuario:', e);
    res.status(500).json({ message: 'Error al autenticar el usuario', e });
  }
};

const editUser = async (req, res) => {

  try {

    const { username, email, password, stats } = req.body;

    if (username) {
      user.username = username;
    }

    if (email) {
      user.email = email;
    }

    if (password) {
      user.password = password;
    }

    if (stats) {
      user.stats = stats;
    }

    const updatedUser = await user.save();

    res.json(updatedUser);

  } catch (e) {
    console.error('Error al editar el usuario:', e);
    res.status(500).json({ message: 'Error al editar el usuario', e });
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
  editUser,
  deleteUser
};



