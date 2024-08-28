const City = require('../models/city.model');

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
            res.status(202).json({ success: false, data: 'That ID does NOT exist.' });
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
            const createdCity = await newCity.save();
            return res.status(201).json({ success: true, data: createdCity });
        } else {
            return res.status(200).json({ success: false, data: 'City already exists!' });
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
                return res.status(202).json({ success: false, data: 'That ID does NOT exist.' });
            } else {
                return res.status(200).json({ success: true, message: 'City deleted successfully!', data: deletedCity });
            }
        } else {
            return res.status(202).json({ success: false, data: 'You have to define an ID' });
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
                return res.status(202).json({ success: false, data: 'That ID does NOT exist.' });
            } else {
                return res.status(200).json({ success: true, message: 'City updated successfully!', data: updatedCity });
            }
        } else {
            return res.status(202).json({ success: false, data: 'You have to define an ID' });
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
};

module.exports = { getAllCities, getCityById, newCity, deleteCity, updateCity };
