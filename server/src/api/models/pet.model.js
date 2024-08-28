const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
    name: { type: String, require: true },
    type: { type: String, require: true, enum: ['cat', 'dog'] }
},
    {
        collection: 'pets',
        timestamps: true // createdAt + updatedAt
    }
);

const Pet = mongoose.model('pets', petSchema);
module.exports = Pet;