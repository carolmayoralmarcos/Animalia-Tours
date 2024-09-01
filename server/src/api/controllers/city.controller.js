const City = require('../models/city.model');
const { deleteFile } = require('../../utils/deleteFileCloud')

const getAllCities = async (req, res) => {
    try {
        const allCities = await City.find();
        res.status(200).json({ success: true, data: allCities });
    } catch (error) {
        res.status(400).json({ success: false, data: error.message });
    }
};

const getCityById = async (req, res) => {
    try {
        const { id } = req.params;
        const filteredCity = await City.findById(id);
        if (!filteredCity) {
            res.status(202).json({ success: false, data: 'Ese ID no existe.' });
        } else {
            res.status(200).json({ success: true, data: filteredCity });
        }
    } catch (error) {
        res.status(400).json({ success: false, data: error.message });
    }
}

const newCity = async (req, res) => {
    try {
        const newCity = new City(req.body);
        const findCity = await City.find({ name: newCity.name });

        if (findCity.length === 0) {
            if (req.hasOwnProperty('file')) {
                newCity.image = req.file.path;
            }
            const createdCity = await newCity.save();
            return res.status(201).json({ success: true, data: createdCity });
        } else {
            return res.status(200).json({ success: false, data: '¡La ciudad ya existe!' });
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
}

const deleteCity = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const deletedCity = await City.findByIdAndDelete(id);
            if (!deletedCity) {
                return res.status(202).json({ success: false, data: 'Ese ID no existe.' });
            } else {
                deleteFile(deletedCity.image);
                return res.status(200).json({ success: true, message: 'Ciudad eliminada correctamente.', data: deletedCity });
            }
        } else {
            return res.status(202).json({ success: false, data: 'Tienes que definir un ID.' });
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
};

const updateCity = async (req, res) => {
    try {
        const { id } = req.params;
        const updateBody = req.body;
        if (id) {
            const updatedCity = await City.findByIdAndUpdate(id, updateBody, { new: true });
            if (!updatedCity) {
                return res.status(202).json({ success: false, data: 'Ese ID no existe.' });
            } else {
                return res.status(200).json({ success: true, message: '¡Ciudad actualizada correctamente!', data: updatedCity });
            }
        } else {
            return res.status(202).json({ success: false, data: 'Tienes que definir un ID.' });
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
};

module.exports = { getAllCities, getCityById, newCity, deleteCity, updateCity };
