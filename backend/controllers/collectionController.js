const db = require("../models");
const Collection = db.Collection;
const seq = db.sequelize;
const asyncHandler = require('express-async-handler');

//get collections by date
const getCollectionByDate = asyncHandler(async(req, res) => {
    const data = req.body;
    console.log(data);
    const [collections, metadata] = await seq.query(
        "SELECT c.*, s.color, s.note, t.truckNo FROM Collections c JOIN Sensors s ON c.sensorId = s.id LEFT JOIN Trucks t ON t.sensorId = s.id WHERE DATE(c.createdAt) = '"+data.date+"'"
    );
    res.status(200).send(collections);
});

module.exports = {
    getCollectionByDate
}