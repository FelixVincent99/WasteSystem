const db = require("../models");
const Schedule = db.Schedule;
const seq = db.sequelize;
const asyncHandler = require('express-async-handler');

// 1. add schedule

const addSchedule = asyncHandler(async(req, res) => {

    let data = {
        scheduleDate: req.body.scheduleDate,
        scheduleTime: req.body.scheduleTime,
        startDateTime: req.body.startDateTime,
        endDateTime: req.body.endDateTime,
        areaId: req.body.areaId,
        truckId: req.body.truckId,
        driverId: req.body.driverId,
        loaderId: req.body.loaderId,
        weightFromSensor: req.body.weightFromSensor,
        actualWeight: req.body.actualWeight,
        fuelConsumption: req.body.fuelConsumption,
        totalMilage: req.body.totalMilage,
        status: req.body.status
    }

    const schedule = await Schedule.create(data);
    res.status(201).send(schedule);
});

// 2. get all schedules

const getAllSchedules = asyncHandler(async(req, res) => {

    const [results, metadata] = await seq.query(
        "SELECT s.*, a.areaCode, t.truckNo, d.mpName AS driver, l.mpName AS loader" +
        " FROM Schedules s JOIN Areas a ON s.areaId = a.id JOIN Trucks t ON s.truckId = t.id JOIN Manpowers d ON s.driverId = d.id JOIN Manpowers l ON s.loaderId = l.id"
    );
    res.status(200).send(results);
});

// 3. get single manpower

const getOneSchedule = asyncHandler(async(req, res) => {

    let id = req.params.id;
    const [results, metadata] = await seq.query(
        "SELECT s.*, a.areaCode, t.truckNo, d.mpName AS driver, l.mpName AS loader" +
        " FROM Schedules s JOIN Areas a ON s.areaId = a.id JOIN Trucks t ON s.truckId = t.id JOIN Manpowers d ON s.driverId = d.id JOIN Manpowers l ON s.loaderId = l.id" +
        " WHERE s.id = " + id
    );
    // let manpower = await Manpower.findOne({ where: { id: id, status: 1 } });
    res.status(200).send(results);
});

// 4. update schedule

const updateSchedule = asyncHandler(async(req, res) => {

    let id = req.params.id;
    const schedule = await Schedule.update(req.body, { where: { id: id } });
    res.status(204).send(schedule);
});


module.exports = {
    addSchedule,
    getAllSchedules,
    getOneSchedule,
    updateSchedule
}