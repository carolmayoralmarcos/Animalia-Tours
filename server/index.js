require("dotenv").config();
const express = require('express');
const { connectDB } = require("./src/utils/db")
const cors = require('cors');
const server = express();
connectDB();

server.use(cors());
const cloudinary = require("cloudinary").v2
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})
server.use(express.json());

const routeAnimal = require('./src/api/routes/animal.routes');
const routeCity = require('./src/api/routes/city.routes');
const routeActivity = require('./src/api/routes/activity.routes');
const routeReservation = require('./src/api/routes/reservation.routes');
const routeUser = require("./src/api/routes/user.routes")

server.use('/api/animals', routeAnimal);
server.use('/api/cities', routeCity);
server.use('/api/activities', routeActivity);
server.use('/api/reservations', routeReservation);
server.use('/api/users', routeUser);

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server runnind on port ${PORT}`);
});