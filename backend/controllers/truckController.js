const db = require("../models");
const Truck = db.trucks;
const Op = db.Sequelize.Op;
const asyncHandler = require('express-async-handler');

// 1. add truck

const addTruck = asyncHandler(async(req, res) => {

    let data = {
        truckNo: req.body.truckNo,
        operationStartDate: req.body.operationStartDate,
        operationEndDate: req.body.operationEndDate,
        truckType: req.body.truckType,
        averageFuelConsumption: req.body.averageFuelConsumption,
        milage: req.body.milage,
        status: req.body.status
    }

    const truck = await Truck.create(data);
    res.status(201).send(truck);
});

// 2. get all trucks

const getAllTrucks = asyncHandler(async(req, res) => {

    let trucks = await Truck.findAll({});
    res.status(200).send(trucks);
});

// 3. get single truck

const getOneTruck = asyncHandler(async(req, res) => {

    let id = req.params.id;
    let truck = await Truck.findOne({ where: { id: id } });
    res.status(200).send(truck);
});

// 4. update truck

const updateTruck = asyncHandler(async(req, res) => {

    let id = req.params.id;
    const truck = await Truck.update(req.body, { where: { id: id } });
    res.status(200).send(truck);
});

// 4. delete truck

const deleteTruck = asyncHandler(async(req, res) => {

    let id = req.params.id;
    await Truck.update({ status: 0 }, { where: { id: id } });
    res.status(200).send('Truck is deleted !');
});


module.exports = {
    addTruck,
    getAllTrucks,
    getOneTruck,
    updateTruck,
    deleteTruck
}