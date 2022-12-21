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
        "SELECT m.* FROM Manpowers m JOIN Schedules s ON m.id = s.driverId WHERE '" + req.body.scheduleDate + "' = s.scheduleDate AND m.role = 1 UNION SELECT m.* FROM Manpowers m JOIN ManpowerLeaves ml ON m.id = ml.manpowerId WHERE '" + req.body.scheduleDate + "' BETWEEN CONVERT(ml.leaveStartDate, DATE) AND CONVERT(ml.leaveEndDate, DATE) AND m.role = 1"
    );
    res.status(200).send(results);
});

// 8. get not available loaders
const getNotAvailableLoaders = asyncHandler(async(req, res) => {    
    const [results, metadata] = await seq.query(        
        "SELECT GROUP_CONCAT(loaderId) AS loaderId FROM (SELECT s.loaderId FROM Manpowers m JOIN Schedules s ON m.id = s.loaderId WHERE '" + req.body.scheduleDate + "' = s.scheduleDate AND m.role = 2 UNION SELECT GROUP_CONCAT(m.id) AS loaderId FROM Manpowers m JOIN ManpowerLeaves ml ON m.id = ml.manpowerId WHERE '" + req.body.scheduleDate + "' BETWEEN CONVERT(ml.leaveStartDate, DATE) AND CONVERT(ml.leaveEndDate, DATE) AND m.role = 2) AS RESULT"        
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

// 13. get default available drivers
const getDefaultAvailableDrivers = asyncHandler(async(req, res) => {    
    var cfQuery = "WHERE "
    if(req.body.cf.monday == true){
        cfQuery += "collectionFrequency LIKE '%/1/%' OR "
    }
    if(req.body.cf.tuesday == true){
        cfQuery += "collectionFrequency LIKE '%/2/%' OR "
    }
    if(req.body.cf.wednesday == true){
        cfQuery += "collectionFrequency LIKE '%/3/%' OR "
    }
    if(req.body.cf.thursday == true){
        cfQuery += "collectionFrequency LIKE '%/4/%' OR "
    }
    if(req.body.cf.friday == true){
        cfQuery += "collectionFrequency LIKE '%/5/%' OR "
    }
    if(req.body.cf.saturday == true){
        cfQuery += "collectionFrequency LIKE '%/6/%' OR "
    }
    if(req.body.cf.sunday == true){
        cfQuery += "collectionFrequency LIKE '%/0/%' OR "
    }

    cfQuery = cfQuery == "WHERE " ? "" : cfQuery.slice(0,-3)

    var idQuery = ""
    if(req.body.oriDefaultDriverId !== undefined){
        idQuery = " UNION SELECT * from Manpowers WHERE id = '" + req.body.oriDefaultDriverId + "'"
    }

    const [results, metadata] = await seq.query(        
        "SELECT * from Manpowers WHERE id NOT IN (SELECT * FROM (SELECT defaultDriverId FROM Areas " + cfQuery + " )a WHERE a.defaultDriverId IS NOT NULL) AND role = '1' AND status = '1'" + idQuery
    );
    res.status(200).send(results);
});

// 14. get default available loaders
const getDefaultAvailableLoaders = asyncHandler(async(req, res) => {    
    var cfQuery = "WHERE "
    if(req.body.cf.monday == true){
        cfQuery += "collectionFrequency LIKE '%/1/%' OR "
    }
    if(req.body.cf.tuesday == true){
        cfQuery += "collectionFrequency LIKE '%/2/%' OR "
    }
    if(req.body.cf.wednesday == true){
        cfQuery += "collectionFrequency LIKE '%/3/%' OR "
    }
    if(req.body.cf.thursday == true){
        cfQuery += "collectionFrequency LIKE '%/4/%' OR "
    }
    if(req.body.cf.friday == true){
        cfQuery += "collectionFrequency LIKE '%/5/%' OR "
    }
    if(req.body.cf.saturday == true){
        cfQuery += "collectionFrequency LIKE '%/6/%' OR "
    }
    if(req.body.cf.sunday == true){
        cfQuery += "collectionFrequency LIKE '%/0/%' OR "
    }

    cfQuery = cfQuery == "WHERE " ? "" : cfQuery.slice(0,-3)

    const [defaultLoadersId, metadata] = await seq.query(        
        "SELECT * FROM (SELECT defaultLoadersId FROM Areas " + cfQuery + ")a WHERE a.defaultLoadersId IS NOT NULL"
    );
    var proccessedExistLoadersId = []
    for(var a=0; a<defaultLoadersId.length; a++){
        for(var b=0; b<defaultLoadersId[a].defaultLoadersId.split(",").length; b++){
            proccessedExistLoadersId.push(defaultLoadersId[a].defaultLoadersId.split(",")[b])
        }
    }

    const [rawLoadersId, metadata2] = await seq.query(        
        "SELECT * from Manpowers WHERE role = '2' AND status = '1'"
    );
    var results = []
    for(var c=0; c<rawLoadersId.length; c++){
        if(!proccessedExistLoadersId.includes(rawLoadersId[c].id.toString())){
            results.push(rawLoadersId[c])
        }
        if(req.body.loaders != undefined){
            if(req.body.oriLoaders.includes(rawLoadersId[c].id)){
                results.push(rawLoadersId[c])
            }
        }
    }    
    res.status(200).send(results);
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
    getDefaultAvailableDrivers,
    getDefaultAvailableLoaders
}