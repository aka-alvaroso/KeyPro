const prisma = require('../config/db');

const createText = async (req, res) => {
  try {
    const { content, difficulty, length, type, language } = req.body;

    if (!content || !difficulty || !length || !type) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const savedText = await prisma.text.create({
      data: { content, difficulty, length, type, language: language ?? null },
    });

    res.status(201).json(savedText);
  } catch (e) {
    console.error('Error al guardar el texto:', e);
    res.status(500).json({ message: 'Error al guardar el texto', e });
  }
};

const getText = async (req, res) => {
  try {
    const { type, difficulty, length, language, recentIds } = req.query;

    const excluded = recentIds ? recentIds.split(',').filter(Boolean) : [];

    const where = {
      ...(type       && { type }),
      ...(difficulty && { difficulty }),
      ...(length     && { length }),
      ...(language   && { language }),
      ...(excluded.length > 0 && { id: { notIn: excluded } }),
    };

    // Obtener IDs candidatos y elegir uno al azar en el servidor
    const candidates = await prisma.text.findMany({ where, select: { id: true } });

    // Si la exclusión dejó sin candidatos, reintentar sin ella
    const finalCandidates = candidates.length > 0
      ? candidates
      : await prisma.text.findMany({
          where: { ...where, id: undefined },
          select: { id: true },
        });

    if (finalCandidates.length === 0) {
      return res.status(404).json({ message: 'No hay textos disponibles para estos filtros' });
    }

    const randomId = finalCandidates[Math.floor(Math.random() * finalCandidates.length)].id;
    const text = await prisma.text.findUnique({ where: { id: randomId } });

    res.json(text);
  } catch (e) {
    res.status(500).json({ message: 'Error al obtener texto', error: e.message });
  }
};

module.exports = { createText, getText };
