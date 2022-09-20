const db = require("../models");
const Area = db.areas;
const Op = db.Sequelize.Op;
const asyncHandler = require('express-async-handler');

const createArea = asyncHandler(async (req,res) => {
    const { areaCode } = req.body;

    console.log(req.body);
    if(!areaCode){
        res.status(400);
        throw new Error('Area Code cannot be empty');
    }

    const areaExists = await Area.findOne({where: { areaCode: areaCode }});

    if(areaExists){
        res.status(400);
        throw new Error('Area Code already exists');
    }

    const area = {
        areaCode: areaCode,
        status: 1
    }

    const createArea = await Area.create(area);

    if(createArea){
        res.status(201).json(area);
    }else{
        res.status(400);
        throw new Error('Invalid area data');
    }
});

module.exports = {
    createArea,
}
