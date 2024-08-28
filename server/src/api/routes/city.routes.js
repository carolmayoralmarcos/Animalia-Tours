const express = require('express');
const { getAllCities, getCityById, newCity, deleteCity, updateCity } = require('../controllers/city.controller');

const routeCities = express.Router();

routeCities.get('/all', getAllCities);
routeCities.get('/:id', getCityById);
routeCities.post('/new', newCity);
routeCities.delete('/delete/:id', deleteCity);
routeCities.put('/update/:id', updateCity);

module.exports = routeCities;
