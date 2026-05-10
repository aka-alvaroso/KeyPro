const prisma = require('../config/db');

const VALID_ORDER_BY = ['bestScore', 'bestSpeed', 'avgScore', 'avgSpeed', 'avgAccuracy', 'totalTests'];

const getRanking = async (req, res) => {
  const { orderBy } = req.params;

  if (!VALID_ORDER_BY.includes(orderBy)) {
    return res.status(400).json({ error: 'Invalid orderBy' });
  }

  const users = await prisma.user.findMany({
    orderBy: { [orderBy]: 'desc' },
    take: 10,
  });

  if (users.length === 0) {
    return res.status(404).json({ error: 'No users found' });
  }

  res.status(200).json(users);
};

module.exports = { getRanking };
