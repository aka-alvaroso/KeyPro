// /routes/rankingRoutes.js

const express = require('express');
const router = express.Router();
const rankingsController = require('../controllers/rankingsController');

router.get('/:orderBy', rankingsController.getRanking);

module.exports = router;
