const Activity = require('../models/activity.model');
const { deleteFile } = require('../../utils/deleteFileCloud')

const getAllActivities = async (req, res) => {
    try {
        const allActivities = await Activity.find().populate('city_id');
        return res.status(200).json({ success: true, data: allActivities });
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
};

const getActivitybyId = async (req, res) => {
    try {
        const { id } = req.params;
        const filteredActivity = await Activity.findById(id).populate('city_id');
        if (!filteredActivity) {
            return res.status(202).json({ success: false, data: 'That ID does NOT exist.' });
        } else {
            return res.status(200).json({ success: true, data: filteredActivity });
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
}

const getActivitiesByCityId = async (req, res) => {
    try {
        const { cityId } = req.params;
        const filteredActivities = await Activity.find({ city_id: cityId }).populate('city_id');
        if (!filteredActivities) {
            return res.status(202).json({ success: false, data: 'That ID does NOT exist.' });
        } else {
            return res.status(200).json({ success: true, data: filteredActivities });
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
}

const newActivity = async (req, res) => {
    try {
        const newActivity = new Activity(req.body);
        const findActivity = await Activity.find({ name: newActivity.name });

        if (findActivity.length === 0) {
            if (req.hasOwnProperty('file')) {
                newActivity.image = req.file.path;
            }
            const createdActivity = await newActivity.save();
            return res.status(201).json({ success: true, data: createdActivity });
        } else {
            return res.status(200).json({ success: false, data: 'Activity already exists!' });
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
}

const deleteActivity = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const deletedActivity = await Activity.findByIdAndDelete(id);
            if (!deletedActivity) {
                return res.status(202).json({ success: false, data: 'That ID does NOT exist.' });
            } else {
                deleteFile(deletedActivity.image);
                return res.status(200).json({ success: true, message: 'Activity deleted successfully!', data: deletedActivity });
            }
        } else {
            return res.status(202).json({ success: false, data: 'You have to define an ID' });
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
};

const updateActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const updateBody = req.body;
        if (id) {
            const updatedActivity = await Activity.findByIdAndUpdate(id, updateBody, { new: true }).populate('city_id');;
            if (!updatedActivity) {
                return res.status(202).json({ success: false, data: 'That ID does NOT exist.' });
            } else {
                return res.status(200).json({ success: true, message: 'Activity updated successfully!', data: updatedActivity });
            }
        } else {
            return res.status(202).json({ success: false, data: 'You have to define an ID' });
        }
    } catch (error) {
        return res.status(400).json({ success: false, data: error.message });
    }
};

module.exports = { getAllActivities, getActivitybyId, newActivity, deleteActivity, updateActivity, getActivitiesByCityId };