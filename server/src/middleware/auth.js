const { verifyToken } = require('../utils/jwt')
const User = require('../api/models/user.model');

const isAuth = async (req, res, next) => {
    const authorization = req.headers.authorization;
    // Bearer {token-info}
    if (!authorization) {
        return res.status(400).json({ success: false, data: 'You are not authorized.' });
    }

    const token = authorization.split(" ")[1];
    if (!token) {
        return res.status(400).json({ success: false, data: 'Token not found.' });
    }

    const tokenVerify = verifyToken(token);
    if (!tokenVerify.success) {
        return res.status(400).json({ success: false, data: 'Token not verified' });
    }

    const loggedUser = await User.findById(tokenVerify.data.id);
    req.userData = loggedUser;
    next();
};

const isAdmin = async (req, res, next) => {
    const authorization = req.headers.authorization;
    // Bearer {token-info}
    if (!authorization) {
        return res.status(400).json({ success: false, data: 'You are not authorized.' });
    }

    const token = authorization.split(" ")[1];
    if (!token) {
        return res.status(400).json({ success: false, data: 'Token not found.' });
    }

    const tokenVerify = verifyToken(token);
    if (!tokenVerify.success) {
        return res.status(400).json({ success: false, data: 'Token not verified' });
    }

    const loggedUser = await User.findById(tokenVerify.data.id);

    if (loggedUser.role !== 'admin') {
        return res.json({ success: false, data: 'User is not an admin' });
    }

    req.adminData = loggedUser;
    next();
};

module.exports = { isAuth, isAdmin }