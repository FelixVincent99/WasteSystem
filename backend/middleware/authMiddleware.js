const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const db = require("../models");
const User = db.User;

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //Get token from header
            token = req.headers.authorization.split(' ')[1];

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //Get user from token: mytodo
            req.user = await User.findByPk(decoded.id); //attributes: { exclude: ['password'] }

            next();
        }catch{
            console.log(error);
            res.status(401);
            throw new Error('Not authorized');
        }
    }

    if(!token){
        res.status(401);
        throw new Error('Not authorized');
    }
})

module.exports = { protect }