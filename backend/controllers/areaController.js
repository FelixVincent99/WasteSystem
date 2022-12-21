const db = require("../models");
const Area = db.Area;
const Truck = db.Truck;
const Manpower = db.Manpower;
const Op = db.Sequelize.Op;
const asyncHandler = require('express-async-handler');

// 1. add area

const addArea = asyncHandler(async(req, res) => {
    const { areaCode } = req.body;

    if (!areaCode) {
        res.status(400);
        throw new Error('Area Code cannot be empty');
    }

    const areaExists = await Area.findOne({ where: { areaCode: areaCode } });

    if (areaExists) {
        res.status(400);
        throw new Error('Area Code already exists');
    }

    let data = {
        areaCode: areaCode,
        status: 1,
        defaultTruckId: req.body.defaultTruckId === "" ? null : req.body.defaultTruckId ,
        defaultDriverId: req.body.defaultDriverId === "" ? null : req.body.defaultDriverId ,
        defaultLoadersId: req.body.defaultLoadersId === "" ? null : req.body.defaultLoadersId,
        collectionFrequency: req.body.collectionFrequency,
    }
    const area = await Area.create(data);

    if (area) {
        res.status(201).send(area);
    } else {
        res.status(400);
        throw new Error('Invalid area data');
    }
});

// 2. get all areas

const getAllAreas = asyncHandler(async(req, res) => {

    let areas = await Area.findAll({
        include: [
            {
                model: Truck                
            },
            {
                model: Manpower
            }
        ],
        where: { status: 1 } 
    });
    res.status(200).send(areas);
});

// 3. get single area

const getOneArea = asyncHandler(async(req, res) => {
    
    let id = req.params.id;
    let area = await Area.findOne({ where: { id: id, status: 1 } });
    res.status(200).send(area);
});

// 4. update area

const updateArea = asyncHandler(async(req, res) => {

    let id = req.params.id;

    let areaCode = req.body.areaCode.toUpperCase();
    if (!areaCode) {
        res.status(400);
        throw new Error('Area Code cannot be empty');
    }

    const areaExists = await Area.findOne({
        where: {
            areaCode: areaCode,
            id: {
                [Op.not]: id
            }
        }
    });

    if (areaExists) {
        res.status(400);
        throw new Error('Area Code already exists');
    }
    const area = await Area.update(req.body, { where: { id: id } });
    res.status(204).send(area);
});

module.exports = {
    addArea,
    getAllAreas,
    getOneArea,
    updateArea
}