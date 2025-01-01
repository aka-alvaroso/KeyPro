// /routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/update', userController.updateStats);
router.get('/data', userController.getUserData);
router.put('/data', userController.updateUserData);
router.delete('/delete', userController.deleteUser);


module.exports = router;
