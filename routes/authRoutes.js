const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// User registration
router.post('/register', authController.register);

// User login
router.post('/login', authController.login);

// Get user profile (protected route)
router.get('/profile', authMiddleware.verifyToken, authController.getProfile);

module.exports = router;
