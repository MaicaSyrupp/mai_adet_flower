const db = require('../config/db');

// Create a new department
exports.createDepartment = (req, res) => {
    const { dept_code, dept_name, user_id } = req.body;
    
    // Check if all required fields are provided
    if (!dept_code || !dept_name || !user_id) {
        return res.status(400).json({ error: 'Please provide dept_code, dept_name, and user_id.' });
    }

    const sql = 'INSERT INTO departments (dept_code, dept_name, user_id) VALUES (?, ?, ?)';
    db.query(sql, [dept_code, dept_name, user_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Department created successfully!', dept_id: results.insertId });
    });
};

// Get all departments
exports.getAllDepartments = (req, res) => {
    db.query('SELECT * FROM departments', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Get a department by ID
exports.getDepartmentById = (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM departments WHERE dept_id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Department not found!' });
        }
        res.json(results[0]);
    });
};

// Update a department by ID
exports.updateDepartment = (req, res) => {
    const { id } = req.params;
    const { dept_code, dept_name, user_id } = req.body;

    // Check if at least one field is provided for update
    if (!dept_code && !dept_name && !user_id) {
        return res.status(400).json({ error: 'At least one field (dept_code, dept_name, user_id) is required for update.' });
    }

    const sql = 'UPDATE departments SET dept_code = ?, dept_name = ?, user_id = ? WHERE dept_id = ?';
    db.query(sql, [dept_code, dept_name, user_id, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Department not found!' });
        }
        res.json({ message: 'Department updated successfully!' });
    });
};

// Delete a department by ID
exports.deleteDepartment = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM departments WHERE dept_id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Department not found!' });
        }
        res.json({ message: 'Department deleted successfully!' });
    });
};
