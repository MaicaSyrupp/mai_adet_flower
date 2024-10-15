const express = require('express');
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware.verifyToken, usersController.createUser);  // All users can create

router.get('/', authMiddleware.verifyToken, usersController.getAllUsers);  // All users can view the list

router.get('/:id', authMiddleware.verifyToken, usersController.getUserById); // Any user can get their own details

router.put('/:id', authMiddleware.verifyToken, usersController.updateUser); // Any user can update their own details

router.delete('/:id', authMiddleware.verifyToken, usersController.deleteUser); // Any user can delete their own account

module.exports = router;
