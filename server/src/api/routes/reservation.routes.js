const express = require('express');
const { getAllReservations, getReservationbyId, createReservation, deleteReservation, updateReservation } = require('../controllers/reservation.controller');
const upload = require('../../middleware/upload');

const routeReservations = express.Router();

routeReservations.get('/all', getAllReservations);
routeReservations.get('/:id', getReservationbyId);
routeReservations.post('/new', upload.single('photo'), createReservation);
routeReservations.delete('/delete/:id', deleteReservation);
routeReservations.put('/update/:id', updateReservation);

module.exports = routeReservations;
