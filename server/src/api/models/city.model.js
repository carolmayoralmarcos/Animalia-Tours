const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
    name: { type: String, require: true, unique: true },
    description: { type: String, require: true },
    image: { type: String, require: true }
},
    {
        collection: 'cities',
        timestamps: true
    }
);

const City = mongoose.model('cities', citySchema);
module.exports = City;