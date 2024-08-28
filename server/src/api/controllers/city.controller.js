const City = require('../models/philo.model');
const { deleteFile } = require('../../utils/deleteFileCloud')

const getAllPhilos = async (req, res) => {
    try {
        const allPhilos = await Philosopher.find();
        res.status(200).json({ success: true, data: allPhilos });
    } catch (error) {
        res.status(400).json({ success: false, data: error.message });
    }
};

const getPhilobyId = async (req, res) => {
    try {
        const { id } = req.params;
        const filteredPhilo = await Philosopher.findById(id);
        if (!filteredPhilo) {
            res.status(202).json({ success: false, data: 'That ID does NOT exist.' });
        } else {
            res.status(200).json({ success: true, data: filteredPhilo });
        }
    } catch (error) {
        res.status(400).json({ success: false, data: error.message });
    }
}

const createPhilosopher = async (req, res) => {
    try {
        const newPhilo = new Philosopher(req.body);
        const findPhilo = await Philosopher.find({ name: newPhilo.name });

        if (findPhilo.length === 0) {
            if (req.hasOwnProperty('file')) {
                newPhilo.photo = req.file.path;
            }
            const createdPhilo = await newPhilo.save();
            return res.status(201).json({ success: true, data: createdPhilo });
        } else {
            return res.status(200).json({ success: false, data: 'Philosopher already exists!' });
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
}

const deletePhilosopher = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const deletedPhilo = await Philosopher.findByIdAndDelete(id);
            if (!deletedPhilo) {
                return res.status(202).json({ success: false, data: 'That ID does NOT exist.' });
            } else {
                deleteFile(deletedPhilo.photo);
                return res.status(200).json({ success: true, message: 'Philosopher deleted successfully!', data: deletedPhilo });
            }
        } else {
            return res.status(202).json({ success: false, data: 'You have to define an ID' });
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
};

const updatePhilosopher = async (req, res) => {
    try {
        const { id } = req.params;
        const updateBody = req.body;
        if (id) {
            const updatedPhilo = await Philosopher.findByIdAndUpdate(id, updateBody, { new: true });
            if (!updatedPhilo) {
                return res.status(202).json({ success: false, data: 'That ID does NOT exist.' });
            } else {
                return res.status(200).json({ success: true, message: 'Philosopher updated successfully!', data: updatedPhilo });
            }
        } else {
            return res.status(202).json({ success: false, data: 'You have to define an ID' });
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
};

module.exports = { getAllPhilos, getPhilobyId, createPhilosopher, deletePhilosopher, updatePhilosopher };