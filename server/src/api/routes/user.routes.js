const express = require('express');
const { getAllUser, getUserbyId, newUser, deleteUser, updateUser, login, getProfile, addPetToUser, removePetfromUser } = require('../controllers/user.controller');
const { isAuth, isAdmin } = require('../../middleware/auth');

const routeUser = express.Router();

routeUser.get('/all', [isAdmin], getAllUser);
routeUser.get('/:id', [isAdmin], getUserbyId);
routeUser.post('/new', newUser);
routeUser.delete('/delete/:id', [isAdmin], deleteUser);
routeUser.put('/update/:id', updateUser);
routeUser.post("/login", login);
routeUser.get("/get/profile", [isAuth], getProfile);
routeUser.put("/addPet/:idU/:idP", addPetToUser);
routeUser.put("/removePet/:idU/:idP", removePetfromUser);

module.exports = routeUser;