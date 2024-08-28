const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    name: { type: String, require: true, unique: true },
    status: { type: String, require: true, enum: ['pending', 'confirmed', 'cancelled', 'completed', 'No-show', 'Rescheduled', 'Awaiting Payment', 'Expired'], default: 'pending' },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    activity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity',
        required: true
    },
},
    {
        collection: 'reservations',
        timestamps: true // createdAt + updatedAt
    }
);

const Reservation = mongoose.model('reservations', reservationSchema);
module.exports = Reservation;