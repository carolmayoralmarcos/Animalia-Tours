const Reservation = require('../models/reservation.model');
const { deleteFile } = require('../../utils/deleteFileCloud')

const getAllReservations = async (req, res) => {
    try {
        const allReservations = await Reservation.find();
        res.status(200).json({ success: true, data: allReservations });
    } catch (error) {
        res.status(400).json({ success: false, data: error.message });
    }
};

const getReservationbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const filteredReservation = await Reservation.findById(id);
        if (!filteredReservation) {
            res.status(202).json({ success: false, data: 'That ID does NOT exist.' });
        } else {
            res.status(200).json({ success: true, data: filteredReservation });
        }
    } catch (error) {
        res.status(400).json({ success: false, data: error.message });
    }
}

const createReservation = async (req, res) => {
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
            return res.status(200).json({ success: false, data: 'Reservation already exists!' });
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
                return res.status(202).json({ success: false, data: 'That ID does NOT exist.' });
            } else {
                deleteFile(deletedReservation.photo);
                return res.status(200).json({ success: true, message: 'Reservation deleted successfully!', data: deletedReservation });
            }
        } else {
            return res.status(202).json({ success: false, data: 'You have to define an ID' });
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
                return res.status(202).json({ success: false, data: 'That ID does NOT exist.' });
            } else {
                return res.status(200).json({ success: true, message: 'Reservation updated successfully!', data: updatedReservation });
            }
        } else {
            return res.status(202).json({ success: false, data: 'You have to define an ID' });
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
};

module.exports = { getAllReservations, getReservationbyId, createReservation, deleteReservation, updateReservation };
