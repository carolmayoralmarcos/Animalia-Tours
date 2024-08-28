const jwt = require('jsonwebtoken');

const generateToken = (loggedUser) => {
    return jwt.sign(loggedUser, process.env.JWT_KEY, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_KEY)
};

module.exports = { generateToken, verifyToken }