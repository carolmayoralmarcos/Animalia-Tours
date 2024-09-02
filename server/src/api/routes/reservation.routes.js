const express = require('express');
const { getAllReservations, getReservationbyId, newReservation, deleteReservation, updateReservation, getReservationsByUserId } = require('../controllers/reservation.controller');
const { isAuth, isAdmin } = require('../../middleware/auth');

const routeReservation = express.Router();

routeReservation.get('/all', [isAdmin], getAllReservations);
routeReservation.get('/:id', getReservationbyId);
routeReservation.get('/user/:userId', getReservationsByUserId);
routeReservation.post('/new', newReservation);
routeReservation.delete('/delete/:id', [isAdmin], deleteReservation);
routeReservation.put('/update/:id', updateReservation);

module.exports = routeReservation;
