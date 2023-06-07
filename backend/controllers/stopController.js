const db = require("../models");
const Stop = db.Stop;
const Op = db.Sequelize.Op;
const asyncHandler = require('express-async-handler');

// 1. add stop

const addStop = asyncHandler(async(req, res) => {
    let data = {
        areaCode: req.body.areaCode,
        stopOrder: req.body.stopOrder,
        stopName: req.body.stopName,
        lat: req.body.lat,
        long: req.body.long,
        binAmount: req.body.binAmount,
        averageWeight: req.body.averageWeight,
        status: req.body.status
    }

    if (!data.areaCode && !data.stopName) {
        res.status(400);
        throw new Error('Area Code and Stop Name cannot be empty');
    }

    const stop = await Stop.create(data);
    res.status(201).send(stop);
});

// 2. get all stops

const getAllStops = asyncHandler(async(req, res) => {

    let stops = await Stop.findAll();
    res.status(200).send(stops);
});

// 3. get stops by area code

const getStopsAreaCode = asyncHandler(async(req, res) => {
    
    let areaCode = req.params.id;
    let stops = await Stop.findAll({ where: { areaCode: areaCode} });
    res.status(200).send(stops);
});

// 4. get single stop

const getOneStop = asyncHandler(async(req, res) => {
    
    let id = req.params.id;
    let stop = await Stop.findOne({ where: { id: id} });
    res.status(200).send(stop);
});

// 5. update stop

const updateStop = asyncHandler(async(req, res) => {

    let id = req.params.id;
    const stop = await Stop.update(req.body, { where: { id: id } });
    res.status(204).send(stop);
});

module.exports = {
    addStop,
    getAllStops,
    getStopsAreaCode,
    getOneStop,
    updateStop
}