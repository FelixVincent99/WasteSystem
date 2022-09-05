const express = require('express');
const cors = require("cors");
const colors = require('colors');
const dotenv = require('dotenv').config();

const { errorHandler } = require('./middleware/errorMiddleware');

var app = express();

const db = require("./models");
db.sequelize.sync().then(() => {
// db.sequelize.sync({ alter: true }).then(() => {
    console.log("Synced DB");
}).catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

var corsOptions = {
    origin: "http://localhost:8081"
};

const PORT  = process.env.PORT || 8000;

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(errorHandler);

app.get("/", (req, res) => {
    res.status(200).json({ message: "Testing for waste management system." });
});

//all routes
app.use('/api/areas', require('./routes/areaRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/iotDevices', require('./routes/iotDevicesRoutes'));

app.listen(PORT, () => console.log(`Server is running on port ${ PORT }`))