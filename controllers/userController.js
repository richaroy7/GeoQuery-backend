const asyncHandler = require('express-async-handler');
const User = require('../models/usermodel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = asyncHandler(async(req, res) => {
    const {first_name,last_name,username,password}=req.body;
    console.log("The request body is :",req.body);
    if(!first_name || !last_name || !username || !password)
    {
        res.status(400);
        throw new Error("Please enter all the fields");
    }
    const userAvailable = await User.findOne({username});
    if(userAvailable)
    {
        res.status(400);
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new User({ 
        first_name,
        last_name,
        username,
        password:hashedPassword 
    });
    const createdUser = await newUser.save();
    
    console.log("The created user is :",createdUser);
    if(createdUser)
    {
        res.status(201).json({_id:createdUser._id, username:createdUser.username});
    }
    else
    {
        res.status(400);
        throw new Error("User has not been registered");
    }
});

const loginUser = asyncHandler(async(req, res) => {
    const {username,password}=req.body;
    if(!username || !password)
    {
        res.status(400);
        throw new Error("Please enter the username and password");
    }
    const user = await User.findOne({username});
    
    if(user && ( await bcrypt.compare(password,user.password)))
    {
        const token=jwt.sign({
            user:{
                username:user.username,
                first_name:user.first_name,
                last_name:user.last_name,
                id:user._id
        }},process.env.JWT_SECRET,{expiresIn:"1h"});//expires in 1 hour
        res.status(200).json({token});
    }
    else
    {
        res.status(401);//unauthorized
        throw new Error("Invalid email or password");
    }
});
const currentUser = asyncHandler(async(req, res) => {
    if(!req.user)
    {
        res.status(400);
        throw new Error("User not found");
    }
    res.status(200).json(req.user);
});
module.exports = {registerUser, loginUser, currentUser};