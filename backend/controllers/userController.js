const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var validator = require('validator');

const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;


//@desc      Register a new user
//@route     /api/users/createUser
//@access    Private
const createUser = asyncHandler(async (req, res) => {
    const {name, email, password, role} = req.body;    

    //validation
    if(!name || !email || !password || !role){
        res.status(400);
        throw new Error('Please include all fields');
    }
    if(!validator.isEmail(email)){
        res.status(400);
        throw new Error('Email format wrong');
    }
    
    // Find if user already exists
    const userExists = await User.findOne({where: {email: email}});

    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(req.body);
    console.log(hashedPassword);

    // Create user
    const user = await User.create({
        name: name,
        email: email,
        role: role,
        password: hashedPassword,        
    });

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
});

//@desc      Login
//@route     /api/users/login
//@access    Public
const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({where:{ email: email}});

    //check user and password match
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(401);
        throw new Error('Invalid Credentials');
    }
});

// Generate token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}

module.exports = {
    createUser,
    loginUser,
}
