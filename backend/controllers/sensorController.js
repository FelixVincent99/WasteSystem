const db = require("../models");
const Sensor = db.Sensor;
const Op = db.Sequelize.Op;
const asyncHandler = require('express-async-handler');

// 1. add sensor

const addSensor = asyncHandler(async(req, res) => {
    let data = {
        color: req.body.color,
        note: req.body.note
    }

    if (!data.color && !data.note) {
        res.status(400);
        throw new Error('Color and Note cannot be empty');
    }

    const sensor = await Sensor.create(data);
    res.status(201).send(sensor);
});

// 2. get all sensors

const getAllSensors = asyncHandler(async(req, res) => {

    let sensors = await Sensor.findAll();
    res.status(200).send(sensors);
});

// 3. get single sensor

const getOneSensor = asyncHandler(async(req, res) => {
    
    let id = req.params.id;
    let sensor = await Sensor.findOne({ where: { id: id} });
    res.status(200).send(sensor);
});

// 4. update sensor

const updateSensor = asyncHandler(async(req, res) => {

    let id = req.params.id;
    const sensor = await Sensor.update(req.body, { where: { id: id } });
    res.status(204).send(sensor);
});

module.exports = {
    addSensor,
    getAllSensors,
    getOneSensor,
    updateSensor
}