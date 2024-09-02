const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    name: {type: String, default: 'name'},
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed', 'No-show', 'Rescheduled', 'Awaiting Payment', 'Expired'], default: 'pending' },
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    activity: { type: Schema.Types.ObjectId, ref: 'activities', required: true },
},
    {
        collection: 'reservations',
        timestamps: true
    }
);

const Reservation = mongoose.model('reservations', reservationSchema);
module.exports = Reservation;