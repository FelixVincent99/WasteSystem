const db = require("../models");
const Collection = db.Collection;
const seq = db.sequelize;
const asyncHandler = require('express-async-handler');

//get collections by date
const getCollectionByDate = asyncHandler(async(req, res) => {
    const data = req.body;
    console.log(data);
    const [collections, metadata] = await seq.query(
        "SELECT * FROM collections WHERE DATE(createdAt) = '"+data.date+"'"
    );
    res.status(200).send(collections);
});

module.exports = {
    getCollectionByDate
}