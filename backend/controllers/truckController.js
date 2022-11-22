const db = require("../models");
const Truck = db.Truck;
const TruckUnavailability = db.TruckUnavailability;
const Op = db.Sequelize.Op;
const asyncHandler = require('express-async-handler');

// 1. add truck
const addTruck = asyncHandler(async(req, res) => {

    let data = {
        truckNo: req.body.truckNo.toUpperCase(),
        operationStartDate: req.body.operationStartDate,
        operationEndDate: req.body.operationEndDate,
        truckType: req.body.truckType,
        averageFuelConsumption: req.body.averageFuelConsumption,
        milage: req.body.milage,
        status: req.body.status
    }

    if (!data.truckNo) {
        res.status(400);
        throw new Error('Truck No cannot be empty');
    }

    const truckExists = await Truck.findOne({ where: { truckNo: data.truckNo } });

    if (truckExists) {
        res.status(400);
        throw new Error('Truck No already exists');
    }

    const truck = await Truck.create(data);
    res.status(201).send(truck);
});

// 2. get all trucks
const getAllTrucks = asyncHandler(async(req, res) => {

    let trucks = await Truck.findAll({ where: { status: 1 } });
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

    let truckNo = req.body.truckNo.toUpperCase();
    if (!truckNo) {
        res.status(400);
        throw new Error('Truck No cannot be empty');
    }

    const truckExists = await Truck.findOne({
        where: {
            truckNo: truckNo,
            id: {
                [Op.not]: id
            }
        }
    });

    if (truckExists) {
        res.status(400);
        throw new Error('Truck No already exists');
    }

    const truck = await Truck.update(req.body, { where: { id: id } });
    res.status(204).send(truck);
});

// 5. add truck unavailability
const addTruckUnavailability = asyncHandler(async(req, res) => {

    let data = {
        truckId: req.body.truckId,
        unavailabilityStartDate: req.body.unavailabilityStartDate,
        unavailabilityEndDate: req.body.unavailabilityEndDate,        
        status: req.body.status
    }

    const truckUnavailability = await TruckUnavailability.create(data);
    res.status(201).send(truckUnavailability);
});

// 6. get all trucks unavailability
const getAllTruckUnavailability = asyncHandler(async(req, res) => {

    let truckUnavailability = await TruckUnavailability.findAll({
        where: { status: 1 },
        include: [{
            model: Truck
        }]
    });
    res.status(200).send(truckUnavailability);
});

// 7. get single truck unavailability
const getOneTruckUnavailability = asyncHandler(async(req, res) => {

    let id = req.params.id;
    let truckUnavailability = await TruckUnavailability.findOne({ where: { id: id } });
    res.status(200).send(truckUnavailability);
});

// 8. update truck unavailability
const updateTruckUnavailability = asyncHandler(async(req, res) => {

    let id = req.params.id;
    const truckUnavailability = await TruckUnavailability.update(req.body, { where: { id: id } });
    res.status(204).send(truckUnavailability);
});

module.exports = {
    addTruck,
    getAllTrucks,
    getOneTruck,
    updateTruck,
    addTruckUnavailability,
    getAllTruckUnavailability,
    getOneTruckUnavailability,
    updateTruckUnavailability
}