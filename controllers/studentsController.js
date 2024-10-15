const db = require('../config/db');

// Create a new student
exports.createStudent = (req, res) => {
    const { last_name, first_name, middle_name, user_id, course_id } = req.body;

    // Check if all required fields are provided
    if (!last_name || !first_name || !user_id || !course_id) {
        return res.status(400).json({ error: 'Please provide last_name, first_name, user_id, and course_id.' });
    }

    const sql = 'INSERT INTO students (last_name, first_name, middle_name, user_id, course_id) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [last_name, first_name, middle_name, user_id, course_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Student created successfully!', student_id: results.insertId });
    });
};

// Get all students
exports.getAllStudents = (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Get a student by ID
exports.getStudentById = (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM students WHERE student_id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Student not found!' });
        }
        res.json(results[0]);
    });
};

// Update a student by ID
exports.updateStudent = (req, res) => {
    const { id } = req.params;
    const { last_name, first_name, middle_name, user_id, course_id } = req.body;

    const sql = 'UPDATE students SET last_name = ?, first_name = ?, middle_name = ?, user_id = ?, course_id = ? WHERE student_id = ?';
    db.query(sql, [last_name, first_name, middle_name, user_id, course_id, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Student not found!' });
        }
        res.json({ message: 'Student updated successfully!' });
    });
};

// Delete a student by ID
exports.deleteStudent = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM students WHERE student_id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Student not found!' });
        }
        res.json({ message: 'Student deleted successfully!' });
    });
};
