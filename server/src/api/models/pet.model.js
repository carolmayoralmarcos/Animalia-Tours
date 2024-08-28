const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
    name: { type: String, require: true },
    type: { type: String, require: true, enum: ['cat', 'dog', 'rabbit'] }
},
    {
        collection: 'pets',
        timestamps: true
    }
);

const Pet = mongoose.model('pets', petSchema);
module.exports = Pet;