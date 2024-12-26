// /controllers/textController.js

const Text = require('../models/Text'); // Importa el modelo de Text

// Función para crear y guardar un nuevo texto
const createText = async (req, res) => {
  try {
    // Destructuramos los campos que esperamos en el cuerpo de la solicitud
    const {
      content,
      numWords,
      difficulty,
      type,
      language
    } = req.body;

    // Verificamos si todos los campos requeridos están presentes
    if (!content || !difficulty || !type) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    // Crear un nuevo texto utilizando el modelo Text
    const newText = new Text({
      content,
      numWords,
      difficulty,
      type,
      language: language || null, // Si no se proporciona lenguaje, será null
    });

    // Guardar el nuevo texto en la base de datos
    const savedText = await newText.save();

    // Enviar una respuesta con el texto guardado
    res.status(201).json(savedText);

  } catch (e) {
    // Manejo de errores
    console.error('Error al guardar el texto:', e);
    res.status(500).json({ message: 'Error al guardar el texto', e });
  }
};

const getTexts = async (req, res) => {
  try {
    const { type, numWords, difficulty, language } = req.query;
    const filter = {
      type: type,
      numWords: numWords,
      difficulty: difficulty,
      language: language

    }

    const texts = await Text.find(filter);
    res.json(texts);
  } catch (e) {
    res.status(500).json({ message: 'Error al obtener textos', error: e.message })
  }
};

module.exports = {
  createText,
  getTexts
};
