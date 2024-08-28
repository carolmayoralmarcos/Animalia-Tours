const express = require('express');
const { getAllActivities, getActivitybyId, newActivity, deleteActivity, updateActivity } = require('../controllers/activity.controller');
const upload = require('../../middleware/upload');

const routeActivity = express.Router();

routeActivity.get('/all', getAllActivities);
routeActivity.get('/:id', getActivitybyId);
routeActivity.post('/new', upload.single('photo'), newActivity);
routeActivity.delete('/delete/:id', deleteActivity);
routeActivity.put('/update/:id', updateActivity);

module.exports = routeActivity;