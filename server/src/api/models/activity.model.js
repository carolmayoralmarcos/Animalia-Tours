const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    name: { type: String, require: true, unique: true },
    description: { type: String, require: true },
    image: { type: String, require: true },
    status: { type: String, require: true, enum: ['open', 'closed', 'full'], default: 'open' },
    max_users: { type: Number, require: true, default: 3 },
    current_users: { type: Number, require: true, default: 0 },
    date: { type: Date, require: true },
    price: { type: Number, require: true },
    city_id: { type: Schema.Types.ObjectId, ref: 'cities' }
},
    {
        collection: 'activities',
        timestamps: true
    }
);

const Activity = mongoose.model('activities', activitySchema);
module.exports = Activity;