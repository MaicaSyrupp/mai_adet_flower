require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db'); // Database configuration
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/usersRoutes');
const departmentsRoutes = require('./routes/departmentsRoutes');
const coursesRoutes = require('./routes/coursesRoutes');
const studentsRoutes = require('./routes/studentsRoutes');

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/departments', departmentsRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/students', studentsRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message || 'Something went wrong!' });
});

// Connect to the database and start the server
const PORT = process.env.APP_PORT || 3000;
db.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database.');

    // Release the connection back to the pool
    connection.release();

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
