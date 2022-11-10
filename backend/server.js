const express = require('express');
const cors = require("cors");
const colors = require('colors');
const dotenv = require('dotenv').config();
const process = require('process');

const { errorHandler } = require('./middleware/errorMiddleware');

var app = express();

const db = require("./models");
const initialDBSetup = require("./models/dummyData");
// db.sequelize.sync().then(() => {
db.sequelize.sync({ force: true }).then(() => {
    initialDBSetup();
    console.log("Synced DB");
}).catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

var corsOptions = {
    origin: "http://219.93.5.3"
};

const PORT = process.env.PORT || 8000;

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).json({ message: "Testing for waste management system." });
});

//all routes
app.use('/api/areas', require('./routes/areaRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/iot', require('./routes/iotDevicesRoutes'));
app.use('/api/trucks', require('./routes/truckRoutes'));
app.use('/api/manpowers', require('./routes/manpowerRoutes'));
app.use('/api/schedules', require('./routes/scheduleRoutes'));

app.listen(PORT, () => console.log(`Server is running on port ${ PORT }`))
app.use(errorHandler);