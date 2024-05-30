const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = {
    _id: user._id, // Include the user ID in the payload
    username: user.username,
    email: user.email,
  };

  const options = {
    expiresIn: '1h', // Token expiration time
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw error;
  }
};

module.exports = { generateToken, verifyToken };
