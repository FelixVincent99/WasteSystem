const db = require("../models");
const Collection = db.Collection;
const Op = db.Sequelize.Op;
const asyncHandler = require('express-async-handler');
const url = require('url');

const sendFromSensor = asyncHandler(async(req, res) => {
    const { weight, lat, lng, sensorId } = url.parse(req.url, true).query;

    if (!weight || !lat || !lng || !sensorId) {
        res.status(401);
        throw new Error('Invalid input');
    }

    const collection = {
        //mytodo: add route id
        weight: weight,
        lat: lat,
        lng: lng,
        sensorId: sensorId
    }

    const insertCollection = await Collection.create(collection);

    if (insertCollection) {
        res.status(201).json(collection); //mytodo: remove return json in production
    } else {
        res.status(400);
        throw new Error('Invalid collection data');
    }
});
module.exports = {
    sendFromSensor,
}