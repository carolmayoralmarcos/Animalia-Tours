const Reservation = require('../models/reservation.model');

const getAllReservations = async (req, res) => {
    try {
        const allReservations = await Reservation.find().populate('user').populate('activity');
        return res.status(200).json({ success: true, data: allReservations });
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
};

const getReservationbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const filteredReservation = await Reservation.findById(id).populate('user').populate('activity');
        if (!filteredReservation) {
            return res.status(202).json({ success: false, data: 'Ese ID no existe.' });
        } else {
            return res.status(200).json({ success: true, data: filteredReservation });
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
}

const newReservation = async (req, res) => {
    try {
        const newReservation = new Reservation(req.body);
        const findReservation = await Reservation.find({ name: newReservation.name });

        if (findReservation.length === 0) {
            if (req.hasOwnProperty('file')) {
                newReservation.photo = req.file.path;
            }
            const createdReservation = await newReservation.save();
            return res.status(201).json({ success: true, data: createdReservation });
        } else {
            return res.status(200).json({ success: false, data: 'Esta reserva ya existe :(' });
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
}

const deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const deletedReservation = await Reservation.findByIdAndDelete(id);
            if (!deletedReservation) {
                return res.status(202).json({ success: false, data: 'Ese ID no existe.' });
            } else {
                return res.status(200).json({ success: true, message: 'Reserva eliminada correctamente.', data: deletedReservation });
            }
        } else {
            return res.status(202).json({ success: false, data: 'Tienes que definir un ID.' });
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
};

const updateReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const updateBody = req.body;
        if (id) {
            const updatedReservation = await Reservation.findByIdAndUpdate(id, updateBody, { new: true });
            if (!updatedReservation) {
                return res.status(202).json({ success: false, data: 'Ese ID no existe.' });
            } else {
                return res.status(200).json({ success: true, message: '¡Reserva actualizada correctamente!', data: updatedReservation });
            }
        } else {
            return res.status(202).json({ success: false, data: 'Tienes que definir un ID.' });
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
};

const getReservationsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const userReservations = await Reservation.find({ user: userId }).populate('user').populate('activity');

        if (userReservations.length === 0) {
            return res.status(200).json({ success: false, data: 'Este usuario no tiene ninguna reserva.' });
        } else {
            return res.status(200).json({ success: true, data: userReservations });
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
};

module.exports = { getAllReservations, getReservationbyId, newReservation, deleteReservation, updateReservation, getReservationsByUserId };