const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Create a new user
exports.createUser = (req, res) => {
    const { username, passwordx, fullname } = req.body;

    if (!username || !passwordx) {
        return res.status(400).json({ error: 'Username and password are required!' });
    }

    const hashedPassword = bcrypt.hashSync(passwordx, 10);
    const sql = 'INSERT INTO users (username, passwordx, fullname) VALUES (?, ?, ?)';

    db.query(sql, [username, hashedPassword, fullname], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'User created successfully!', userId: results.insertId });
    });
};

// Get all users
exports.getAllUsers = (req, res) => {
    const sql = 'SELECT id, username, fullname FROM users';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Get user by ID
exports.getUserById = (req, res) => {
    const sql = 'SELECT id, username, fullname FROM users WHERE id = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found!' });
        }
        res.json(results[0]);
    });
};

// Update user by ID
exports.updateUser = (req, res) => {
    const { username, fullname } = req.body;

    // Check if at least one field is provided for update
    if (!username && !fullname) {
        return res.status(400).json({ error: 'At least one field (username or fullname) is required for update.' });
    }

    const sql = 'UPDATE users SET username = ?, fullname = ? WHERE id = ?';
    db.query(sql, [username, fullname, req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found!' });
        }
        res.json({ message: 'User updated successfully!' });
    });
};

// Delete user by ID
exports.deleteUser = (req, res) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found!' });
        }
        res.json({ message: 'User deleted successfully!' });
    });
};
