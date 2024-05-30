// middleware/auth.js
const { verifyToken } = require('../Utils/jwtUtils');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Expecting Bearer token

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = verifyToken(token,process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded token payload to the request object
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token." });
    }
};

module.exports = authenticate;
