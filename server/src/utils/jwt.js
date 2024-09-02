const jwt = require('jsonwebtoken');

const generateToken = (loggedUser) => {
    return jwt.sign(loggedUser, process.env.JWT_KEY, { expiresIn: '1m' });
};

const verifyToken = (token) => {
    try {
        return { success: true, data: jwt.verify(token, process.env.JWT_KEY) };
    } catch (error) {
        return { success: false, error: error };
    }
};

module.exports = { generateToken, verifyToken }