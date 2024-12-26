// /routes/textRoutes.js

const express = require('express');
const router = express.Router();
const textController = require('../controllers/textController');

router.post('/create', textController.createText);
router.get('/get', textController.getTexts);

module.exports = router;
