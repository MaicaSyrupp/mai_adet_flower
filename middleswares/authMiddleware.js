const jwt = require('jsonwebtoken');

// Middleware to verify the JWT token
exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Check if the Authorization header exists and follows the Bearer format
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET || 'default_secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        // Attach the decoded user ID to the request object
        req.userId = decoded.id;

        // Proceed to the next middleware
        next();
    });
};
