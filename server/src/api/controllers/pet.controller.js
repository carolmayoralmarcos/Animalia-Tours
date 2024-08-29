const Pet = require('../models/pet.model');

const getAllPets = async (req, res) => {
    try {
        const allPets = await Pet.find();
        return res.status(200).json({ success: true, data: allPets });
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
};

const getPetbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const filteredPet = await Pet.findById(id);
        if (!filteredPet) {
            return res.status(202).json({ success: false, data: 'That ID does NOT exist.' });
        } else {
            return res.status(200).json({ success: true, data: filteredPet });
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
}

const newPet = async (req, res) => {
    try {
        const newPet = new Pet(req.body);
        const findPet = await Pet.find({ name: newPet.name });

        if (findPet.length === 0) {
            const createdPet = await newPet.save();
            return res.status(201).json({ success: true, data: createdPet });
        } else {
            return res.status(200).json({ success: false, data: 'Pet already exists!' });
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
}

const deletePet = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const deletedPet = await Pet.findByIdAndDelete(id);
            if (!deletedPet) {
                return res.status(202).json({ success: false, data: 'That ID does NOT exist.' });
            } else {
                return res.status(200).json({ success: true, message: 'Pet deleted successfully!', data: deletedPet });
            }
        } else {
            return res.status(202).json({ success: false, data: 'You have to define an ID' });
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
};

const updatePet = async (req, res) => {
    try {
        const { id } = req.params;
        const updateBody = req.body;
        if (id) {
            const updatedPet = await Pet.findByIdAndUpdate(id, updateBody, { new: true });
            if (!updatedPet) {
                return res.status(202).json({ success: false, data: 'That ID does NOT exist.' });
            } else {
                return res.status(200).json({ success: true, message: 'Pet updated successfully!', data: updatedPet });
            }
        } else {
            return res.status(202).json({ success: false, data: 'You have to define an ID' });
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
};

module.exports = { getAllPets, getPetbyId, newPet, deletePet, updatePet };