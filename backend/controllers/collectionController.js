const db = require("../models");
const Collection = db.Collection;
const Op = db.Sequelize.Op;
const asyncHandler = require('express-async-handler');

//get all collection
const getAllCollections = asyncHandler(async(req, res) => {

    let collections = await Collection.findAll();
    res.status(200).send(collections);
});

module.exports = {
    getAllCollections
}