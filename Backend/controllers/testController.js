// /controllers/testController.js

const Test = require('../models/Test');

const saveTest = async (req, res) => {
  try {
    const {
      id,
      text,
      player,
      date,
      charResults,
      settings,
      results
    } = req.body;

    if (!id || !text || !player || !date || !charResults || !settings || !results) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const newTest = new Test({
      id,
      text,
      player,
      date,
      charResults,
      settings,
      results
    });

    const savedTest = await newTest.save();
    res.status(201).json(savedTest);

  } catch (e) {
    console.error('Error al guardar el test:', e);
    res.status(500).json({ message: 'Error al guardar el test', e });
  }
};

const getUserTests = async (req, res) => {
  try {
    const { username } = req.params;
    const tests = await Test.find({ player: username }).sort({ createdAt: -1 });;
    res.json(tests);
  } catch (e) {
    res.status(500).json({ message: 'Error al obtener tests', error: e.message })
  }
};

const getTest = async (req, res) => {
  try {
    const { id } = req.params;
    const test = await Test.findOne({ id });
    res.status(200).json(test);
  } catch (e) {
    res.status(500).json({ message: 'Error al obtener test', error: e.message })
  }
};

module.exports = {
  saveTest,
  getUserTests,
  getTest
};
