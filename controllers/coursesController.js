const db = require('../config/db');

// Create a new course
exports.createCourse = (req, res) => {
    const { course_code, course_name, user_id, dept_id } = req.body;

    // Check if all required fields are provided
    if (!course_code || !course_name || !user_id || !dept_id) {
        return res.status(400).json({ error: 'Please provide course_code, course_name, user_id, and dept_id.' });
    }

    const sql = 'INSERT INTO courses (course_code, course_name, user_id, dept_id) VALUES (?, ?, ?, ?)';
    db.query(sql, [course_code, course_name, user_id, dept_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Course created successfully!', course_id: results.insertId });
    });
};

// Get all courses
exports.getAllCourses = (req, res) => {
    db.query('SELECT * FROM courses', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Get a course by ID
exports.getCourseById = (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM courses WHERE course_id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Course not found!' });
        }
        res.json(results[0]);
    });
};

// Update a course by ID
exports.updateCourse = (req, res) => {
    const { id } = req.params;
    const { course_code, course_name, user_id, dept_id } = req.body;

    const sql = 'UPDATE courses SET course_code = ?, course_name = ?, user_id = ?, dept_id = ? WHERE course_id = ?';
    db.query(sql, [course_code, course_name, user_id, dept_id, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Course not found!' });
        }
        res.json({ message: 'Course updated successfully!' });
    });
};

// Delete a course by ID
exports.deleteCourse = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM courses WHERE course_id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Course not found!' });
        }
        res.json({ message: 'Course deleted successfully!' });
    });
};
