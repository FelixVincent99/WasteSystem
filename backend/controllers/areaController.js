const db = require("../models");
const Area = db.areas;
const Op = db.Sequelize.Op;
const asyncHandler = require('express-async-handler');

const addArea = asyncHandler(async(req, res) => {
    const { areaCode } = req.body;

    console.log(req.body);
    if (!areaCode) {
        res.status(400);
        throw new Error('Area Code cannot be empty');
    }

    const areaExists = await Area.findOne({ where: { areaCode: areaCode } });

    if (areaExists) {
        res.status(400);
        throw new Error('Area Code already exists');
    }

    const area = {
        areaCode: areaCode,
        status: 1
    }

    const addArea = await Area.create(area);

    if (addArea) {
        res.status(201).send(area);
    } else {
        res.status(400);
        throw new Error('Invalid area data');
    }
});

// 2. get all areas

const getAllAreas = asyncHandler(async(req, res) => {

    let areas = await Area.findAll({});
    res.status(200).send(areas);
});

// 3. get single area

const getOneArea = asyncHandler(async(req, res) => {

    let id = req.params.id;
    let area = await Area.findOne({ where: { id: id } });
    res.status(200).send(area);
});

// 4. update area

const updateArea = asyncHandler(async(req, res) => {

    let id = req.params.id;
    const area = await Area.update(req.body, { where: { id: id } });
    res.status(200).send(area);
});

// 4. delete area

const deleteArea = asyncHandler(async(req, res) => {

    let id = req.params.id;
    await Area.update({ status: 0 }, { where: { id: id } });
    res.status(200).send('Area is deleted !');
});

module.exports = {
    addArea,
    getAllAreas,
    getOneArea,
    updateArea,
    deleteArea
}