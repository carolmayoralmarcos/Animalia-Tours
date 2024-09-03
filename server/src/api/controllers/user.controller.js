const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../../utils/jwt')

const getAllUser = async (req, res) => {
    try {
        const allUser = await User.find().populate('pets');
        return res.status(200).json({ success: true, data: allUser });
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
};

const getUserbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const filteredUser = await User.findById(id).populate('pets');
        if (!filteredUser) {
            return res.status(202).json({ success: false, data: 'Ese ID no existe.' });
        } else {
            return res.status(200).json({ success: true, data: filteredUser });
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
}

const newUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const findUser = await User.find({ email: newUser.email });

        if (findUser.length === 0) {

            // "Encrypt" password before saving user to database
            newUser.password = bcrypt.hashSync(newUser.password, 10);

            const createdUser = await newUser.save();
            return res.status(201).json({ success: true, data: createdUser })
        } else {
            return res.status(200).json({ success: false, data: 'Ya existe un usuario con ese email.' })
        }
    } catch (error) {
        console.error("Error in newReservation:", error.message, error);
        return res.status(400).json({ success: false, data: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const deletedUser = await User.findByIdAndDelete(id);
            if (!deletedUser) {
                return res.status(202).json({ success: false, data: 'Ese ID no existe.' });
            } else {

                return res.status(200).json({ success: true, message: 'Usuario eliminado correctamente.', data: deletedUser });
            }
        } else {
            return res.status(202).json({ success: false, data: 'Tienes que definir un ID.' });
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
            updateBody.password = bcrypt.hashSync(updateBody.password, 10);
            const updatedUser = await User.findByIdAndUpdate(id, updateBody, { new: true });
            if (!updatedUser) {
                return res.status(202).json({ success: false, data: 'Ese ID no existe.' });
            } else {
                return res.status(200).json({ success: true, message: '¡Usuario actualizado correctamente!', data: updatedUser });
            }
        } else {
            return res.status(202).json({ success: false, data: 'Tienes que definir un ID.' });
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
};

//Authentication
const login = async (req, res) => {
    try {
        const loggedUser = new User(req.body);
        const userByEmail = await User.find({ email: loggedUser.email });

        if (userByEmail.length !== 0) {
            if (bcrypt.compareSync(loggedUser.password, userByEmail[0].password)) {
                // Create JWT and return it
                const data = { id: userByEmail[0]._id, email: userByEmail[0].email }
                const token = generateToken(data)
                return res.status(200).json({ success: true, data: data, username: userByEmail[0].name, token: token, role: userByEmail[0].role })

            } else {
                return res.status(201).json({ success: false, data: 'Las contraseñas no coinciden :(' })
            }
        } else {
            return res.status(201).json({ success: false, data: 'El email no existe, lo sentimos.' })
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
}

//Authorization
const getProfile = async (req, res) => {
    try {
        const loggedUser = req.userData;
        const filteredUser = await User.findById(loggedUser._id).populate('pets');
        return res.status(201).json({ success: true, message: '¡Estás autorizado!', data: filteredUser });
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
};

const addPetToUser = async (req, res) => {
    try {
        const { idU, idP } = req.params;

        const modifiedUser = await User.findByIdAndUpdate(
            idU,
            { $push: { pets: idP } },
            { new: true }
        );

        if (!modifiedUser) {
            return res.status(200).json({ success: false, message: '¡El usuario NO existe!!' })
        } else {
            return res.status(201).json({ success: true, data: modifiedUser })
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
};

const removePetfromUser = async (req, res) => {
    try {
        const { idU, idP } = req.params;

        const modifiedUser = await User.findByIdAndUpdate(
            idU,
            { $pull: { pets: idP } },
            { new: true }
        );

        if (!modifiedUser) {
            return res.status(200).json({ success: false, message: '¡El usuario NO existe!' })
        } else {
            return res.status(201).json({ success: true, data: modifiedUser })
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
};

module.exports = { getAllUser, getUserbyId, newUser, deleteUser, updateUser, login, getProfile, addPetToUser, removePetfromUser };