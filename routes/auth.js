//backend/routes/auth.js
const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateToken } = require("../Utils/jwtUtils");

// Registration route
router.post("/register", async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        const { email, username, password } = req.body;

        // Validate input
        if (!email || !username || !password) {
            return res.status(400).json({ message: "Email, username, and password are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user with hashed password
        const user = new User({ email, username, password: hashedPassword });
        await user.save();

        // Generate JWT token
        const token = generateToken(user);

        // Send response with the token
        res.status(200).json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Signup Internal server error" });
    }
});

// Login route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare the password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate JWT token
        const token = generateToken(user);

        // Send response with the token
        res.status(200).json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Login Internal server error" });
    }
});

module.exports = router;
