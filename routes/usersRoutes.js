const express = require('express');
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new user (all users can create)
router.post('/', authMiddleware.verifyToken, usersController.createUser);

// Get all users (all users can view the list)
router.get('/', authMiddleware.verifyToken, usersController.getAllUsers);

// Get a user by ID (any user can get their own details)
router.get('/:id', authMiddleware.verifyToken, usersController.getUserById);

// Update a user by ID (any user can update their own details)
router.put('/:id', authMiddleware.verifyToken, usersController.updateUser);

// Delete a user by ID (any user can delete their own account)
router.delete('/:id', authMiddleware.verifyToken, usersController.deleteUser);

module.exports = router;
