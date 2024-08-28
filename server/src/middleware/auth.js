const { verifyToken } = require('../utils/jwt')
const User = require('../api/models/user.model');

const isAuth = async (req, res, next) => {
    const authorization = req.headers.authorization;
    // Bearer {token-info}
    if (!authorization) {
        return res.json({ success: false, message: 'You are not authorized.' });
    }

    const token = authorization.split(" ")[1];
    if (!token) {
        return res.json({ success: false, message: 'Token not found.' });
    }

    const tokenVerify = verifyToken(token);
    if (!tokenVerify.id) {
        return res.json({ success: false, message: 'Token not verified' });
    }

    const loggedUser = await User.findById(tokenVerify.id);
    req.userData = loggedUser;
    next();
};

const isAdmin = async (req, res, next) => {
    const authorization = req.headers.authorization;
    // Bearer {token-info}
    if (!authorization) {
        return res.json({ success: false, message: 'You are not authorized.' });
    }

    const token = authorization.split(" ")[1];
    if (!token) {
        return res.json({ success: false, message: 'Token not found.' });
    }

    const tokenVerify = verifyToken(token);
    if (!tokenVerify.id) {
        return res.json({ success: false, message: 'Token not verified' });
    }

    const loggedUser = await User.findById(tokenVerify.id);

    if (loggedUser.role !== 'admin') {
        return res.json({ success: false, message: 'User is not an admin' });
    }

    req.adminData = loggedUser;
    next();
};

module.exports = { isAuth, isAdmin }