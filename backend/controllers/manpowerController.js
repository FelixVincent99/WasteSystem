const db = require("../models");
const Manpower = db.manpowers;
const Op = db.Sequelize.Op;
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

    let manpowers = await Manpower.findAll({});
    res.status(200).send(manpowers);
});

// 3. get single manpower

const getOneManpower = asyncHandler(async(req, res) => {

    let id = req.params.id;
    let manpower = await Manpower.findOne({ where: { id: id } });
    res.status(200).send(manpower);
});

// 4. update manpower

const updateManpower = asyncHandler(async(req, res) => {

    let id = req.params.id;
    const manpower = await Manpower.update(req.body, { where: { id: id } });
    res.status(200).send(manpower);
});

// 4. delete manpower

const deleteManpower = asyncHandler(async(req, res) => {

    let id = req.params.id;
    await Manpower.update({ status: 0 }, { where: { id: id } });
    res.status(200).send('Manpower is deleted !');
});


module.exports = {
    addManpower,
    getAllManpowers,
    getOneManpower,
    updateManpower,
    deleteManpower
}