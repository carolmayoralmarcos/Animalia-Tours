const bcrypt = require('bcrypt');
const User = require('../models/user.model');



const getAllUser = async (req, res) => {
    try {
        const allUser = await User.find();
        res.status(200).json({ success: true, data: allUser });
    } catch (error) {
        res.status(400).json({ success: false, data: error.message });
    }
};

const getUserbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const filteredUser = await User.findById(id);
        if (!filteredUser) {
            res.status(202).json({ success: false, data: 'That ID does NOT exist.' });
        } else {
            res.status(200).json({ success: true, data: filteredUser });
        }
    } catch (error) {
        res.status(400).json({ success: false, data: error.message });
    }
}

const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const findUser = await User.find({ email: newUser.email });

        if (findUser.length === 0) {

            // "Encrypt" password before saving user to database
            newUser.password = bcrypt.hashSync(newUser.password, 10);

            const createdUser = await newUser.save();
            return res.status(200).json({ success: true, data: createdUser })
        } else {
            return res.status(201).json({ success: false, data: 'User already exists!' })
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const deletedUser = await User.findByIdAndDelete(id);
            if (!deletedUser) {
                return res.status(202).json({ success: false, data: 'That ID does NOT exist.' });
            } else {

                return res.status(200).json({ success: true, message: 'User deleted successfully!', data: deletedUser });
            }
        } else {
            return res.status(202).json({ success: false, data: 'You have to define an ID' });
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateBody = req.body;
        if (id) {
            const updatedUser = await User.findByIdAndUpdate(id, updateBody, { new: true });
            if (!updatedUser) {
                return res.status(202).json({ success: false, data: 'That ID does NOT exist.' });
            } else {
                return res.status(200).json({ success: true, message: 'User updated successfully!', data: updatedUser });
            }
        } else {
            return res.status(202).json({ success: false, data: 'You have to define an ID' });
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
};

module.exports = { getAllUser, getUserbyId, createUser, deleteUser, updateUser };