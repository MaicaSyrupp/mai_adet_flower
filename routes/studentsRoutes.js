const express = require('express');
const studentsController = require('../controllers/studentsController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new student (admin only)
router.post('/', authMiddleware.verifyToken, studentsController.createStudent);

// Get all students
router.get('/', studentsController.getAllStudents);

// Get a student by ID
router.get('/:id', studentsController.getStudentById);

// Update a student by ID (admin only)
router.put('/:id', authMiddleware.verifyToken, studentsController.updateStudent);

// Delete a student by ID (admin only)
router.delete('/:id', authMiddleware.verifyToken, studentsController.deleteStudent);

module.exports = router;
