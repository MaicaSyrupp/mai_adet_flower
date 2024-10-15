const express = require('express');
const departmentsController = require('../controllers/departmentsController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new department (admin only)
router.post('/', authMiddleware.verifyToken, departmentsController.createDepartment);

// Get all departments
router.get('/', departmentsController.getAllDepartments);

// Get a department by ID
router.get('/:id', departmentsController.getDepartmentById);

// Update a department by ID (admin only)
router.put('/:id', authMiddleware.verifyToken, departmentsController.updateDepartment);

// Delete a department by ID (admin only)
router.delete('/:id', authMiddleware.verifyToken, departmentsController.deleteDepartment);

module.exports = router;
