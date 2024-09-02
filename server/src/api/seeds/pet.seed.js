const mongoose = require('mongoose');
const Pet = require('../models/pet.model');
require('dotenv').config();

const arrayPets = [
    { name: 'Buddy', type: 'dog' },
    { name: 'Max', type: 'dog' },
    { name: 'Charlie', type: 'dog' },
    { name: 'Whiskers', type: 'cat' },
    { name: 'Mittens', type: 'cat' },
    { name: 'Shadow', type: 'cat' },
    { name: 'Thumper', type: 'rabbit' },
    { name: 'Flopsy', type: 'rabbit' },
    { name: 'Cotton', type: 'rabbit' }
  ];

mongoose.connect(process.env.DB_URL)
    .then(async () => {
        const allPets = await Pet.find();
        if (allPets.length !== 0) {
            await Pet.collection.drop();
        }
    })
    .catch((err) => { console.log('Error while dropping collection.') })
    .then(async () => {
        const petDocs = arrayPets.map((pet) => new Pet(pet))
        await Pet.insertMany(petDocs);
        console.log("Seed worked fine!");
    })
    .catch((err) => { console.log('Error while inserting seed data.', err) })
    .finally(() => mongoose.disconnect());