const express = require('express');
const { getAllUser, getUserbyId, createUser, deleteUser, updateUser } = require('../controllers/user.controller');
const upload = require('../../middleware/upload');

const routeUser = express.Router();

routeUser.get('/all', getAllUser);
routeUser.get('/:id', getUserbyId);
routeUser.post('/new', upload.single('photo'), createUser);
routeUser.delete('/delete/:id', deleteUser);
routeUser.put('/update/:id', updateUser);

module.exports = routeUser;