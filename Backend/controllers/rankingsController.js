// /controllers/rankingController.js
const User = require('../models/User');

const getRanking = async (req, res) => {

  const { orderBy } = req.params;


  if (orderBy !== 'bestScore' && orderBy !== 'bestSpeed' && orderBy !== 'avgScore' && orderBy !== 'avgSpeed' && orderBy !== 'avgAccuracy' && orderBy !== 'totalTests') {
    res.status(400).json({ error: 'Invalid orderBy' });
    return;
  }

  // Ordenar por stats.orderBy
  const users = await User.find({}).sort({ [`stats.${orderBy}`]: -1 }).limit(10);

  if (users.length === 0) {
    res.status(404).json({ error: 'No users found' });
    return;
  }

  res.status(200).json(users);
}


module.exports = {
  getRanking
};



