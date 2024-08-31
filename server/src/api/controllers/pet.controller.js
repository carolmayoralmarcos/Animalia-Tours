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
            return res.status(202).json({ success: false, data: 'Ese ID no existe.' });
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
        const createdPet = await newPet.save();
        return res.status(201).json({ success: true, data: createdPet });
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
                return res.status(202).json({ success: false, data: 'Ese ID no existe.' });
            } else {
                return res.status(200).json({ success: true, message: 'Mascota eliminada correctamente.', data: deletedPet });
            }
        } else {
            return res.status(202).json({ success: false, data: 'Tienes que definir un ID.' });
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
                return res.status(202).json({ success: false, data: 'Ese ID no existe.' });
            } else {
                return res.status(200).json({ success: true, message: '¡Mascota actualizada correctamente!', data: updatedPet });
            }
        } else {
            return res.status(202).json({ success: false, data: 'Tienes que definir un ID.' });
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
};

module.exports = { getAllPets, getPetbyId, newPet, deletePet, updatePet };