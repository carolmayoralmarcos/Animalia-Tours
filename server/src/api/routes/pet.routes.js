const express = require('express');
const { getAllPets, getPetbyId, newPet, deletePet, updatePet } = require('../controllers/pet.controller');
const { isAuth, isAdmin } = require('../../middleware/auth');

const routePet = express.Router();

routePet.get('/all', [isAdmin], getAllPets);
routePet.get('/:id', getPetbyId);
routePet.post('/new', newPet);
routePet.delete('/delete/:id', deletePet);
routePet.put('/update/:id', updatePet);

module.exports = routePet;