const express = require('express');
const { getAllReservations, getReservationbyId, newReservation, deleteReservation, updateReservation } = require('../controllers/reservation.controller');

const routeReservation = express.Router();

routeReservation.get('/all', getAllReservations);
routeReservation.get('/:id', getReservationbyId);
routeReservation.post('/new', newReservation);
routeReservation.delete('/delete/:id', deleteReservation);
routeReservation.put('/update/:id', updateReservation);

module.exports = routeReservation;
