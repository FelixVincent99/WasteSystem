const db = require("../models");
const Manpower = db.Manpower;
const Leave = db.ManpowerLeave;
const Op = db.Sequelize.Op;
const seq = db.sequelize;
const asyncHandler = require('express-async-handler');

// 1. add manpower
const addManpower = asyncHandler(async(req, res) => {

    let data = {
        mpName: req.body.mpName,
        mpAge: req.body.mpAge,
        role: req.body.role,
        gender: req.body.gender,
        operationStartDate: req.body.operationStartDate,
        operationEndDate: req.body.operationEndDate,
        status: req.body.status
    }

    const manpower = await Manpower.create(data);
    res.status(201).send(manpower);
});

// 2. get all manpowers
const getAllManpowers = asyncHandler(async(req, res) => {

    let manpowers = await Manpower.findAll({ where: { status: 1 } });
    res.status(200).send(manpowers);
});

// 3. get single manpower
const getOneManpower = asyncHandler(async(req, res) => {

    let id = req.params.id;
    let manpower = await Manpower.findOne({ where: { id: id, status: 1 } });
    res.status(200).send(manpower);
});

// 4. update manpower
const updateManpower = asyncHandler(async(req, res) => {

    let id = req.params.id;
    const manpower = await Manpower.update(req.body, { where: { id: id } });
    res.status(204).send(manpower);
});

// 5. get all drivers
const getAllDrivers = asyncHandler(async(req, res) => {

    let manpowers = await Manpower.findAll({ where: {
        [Op.and]: [
            { role: 1 },
            { status: 1 }
        ]
    }});
    res.status(200).send(manpowers);
});

// 6. get all loaders
const getAllLoaders = asyncHandler(async(req, res) => {

    let manpowers =await Manpower.findAll({ where: {
        [Op.and]: [
            { role: 2 },
            { status: 1 }
        ]
    }});
    res.status(200).send(manpowers);
});

// 7. get not available drivers
const getNotAvailableDrivers = asyncHandler(async(req, res) => {
    const [results, metadata] = await seq.query(
        "SELECT * FROM Manpowers m WHERE EXISTS (SELECT * FROM Schedules s WHERE scheduleDate = '" + req.body.scheduleDate + "' AND m.id = s.driverId AND s.id != '" + req.body.scheduleId + "') AND role = 1"
    );
    res.status(200).send(results);
});

// 8. get not available loaders
const getNotAvailableLoaders = asyncHandler(async(req, res) => {    
    const [results, metadata] = await seq.query(        
        "SELECT loaderId FROM Schedules WHERE scheduleDate = '" + req.body.scheduleDate + "' AND id != '" + req.body.scheduleId + "'"
    );
    res.status(200).send(results);
});


// 9. add manpower leave
const addManpowerLeaves = asyncHandler(async(req, res) => {

    let data = {
        manpowerId: req.body.manpowerId,        
        leaveStartDate: req.body.leaveStartDate,
        leaveEndDate: req.body.leaveEndDate,
        status: req.body.status
    }

    const leave = await Leave.create(data);
    res.status(201).send(leave);
});

// 10. get all manpower leaves
const getAllManpowerLeaves = asyncHandler(async(req, res) => {

    let leave = await Leave.findAll({
        where: { status: 1 },
        include: [{
            model: Manpower
        }]
    });
    res.status(200).send(leave);
});

// 11. get single manpower leave
const getOneManpowerLeave = asyncHandler(async(req, res) => {

    let id = req.params.id;
    let leave = await Leave.findOne({ where: { id: id, status: 1 } });
    res.status(200).send(leave);
});

// 12. update manpower
const updateManpowerLeave = asyncHandler(async(req, res) => {

    let id = req.params.id;
    const leave = await Leave.update(req.body, { where: { id: id } });
    res.status(204).send(leave);
});

module.exports = {
    addManpower,
    getAllManpowers,
    getOneManpower,
    updateManpower,
    getAllDrivers,
    getAllLoaders,
    getNotAvailableDrivers,
    getNotAvailableLoaders,
    addManpowerLeaves,
    getAllManpowerLeaves,
    getOneManpowerLeave,
    updateManpowerLeave,
}