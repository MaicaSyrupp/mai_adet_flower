const express = require('express');
const coursesController = require('../controllers/coursesController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new course (admin only)
router.post('/', authMiddleware.verifyToken, coursesController.createCourse);

// Get all courses
router.get('/', coursesController.getAllCourses);

// Get a course by ID
router.get('/:id', coursesController.getCourseById);

// Update a course by ID (admin only)
router.put('/:id', authMiddleware.verifyToken, coursesController.updateCourse);

// Delete a course by ID (admin only)
router.delete('/:id', authMiddleware.verifyToken, coursesController.deleteCourse);

module.exports = router;
