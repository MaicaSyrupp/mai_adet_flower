const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User registration
exports.register = (req, res) => {
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
        res.status(201).json({ message: 'User registered successfully!', userId: results.insertId });
    });
};

// User login
exports.login = (req, res) => {
    const { username, passwordx } = req.body;

    if (!username || !passwordx) {
        return res.status(400).json({ error: 'Username and password are required!' });
    }

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password!' });
        }

        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(passwordx, user.passwordx);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password!' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '24h' });

        res.json({ message: 'Login successful!', token, refreshToken });
    });
};

// Refresh token
exports.refreshToken = (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token is required!' });
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid refresh token!' });
        }

        const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ accessToken: newAccessToken });
    });
};

// Get user profile
exports.getProfile = (req, res) => {
    const sql = 'SELECT id, username, fullname FROM users WHERE id = ?';
    db.query(sql, [req.userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found!' });
        }
        res.json(results[0]);
    });
};
