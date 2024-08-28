const express = require('express');
const { getAllCities, getCityById, newCity, deleteCity, updateCity } = require('../controllers/city.controller');

const routeCity = express.Router();

routeCity.get('/all', getAllCities);
routeCity.get('/:id', getCityById);
routeCity.post('/new', newCity);
routeCity.delete('/delete/:id', deleteCity);
routeCity.put('/update/:id', updateCity);

module.exports = routeCity;
