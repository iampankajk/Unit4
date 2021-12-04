const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const {body,validationResult} = require('express-validator');

const newToken = (user)=>{
    return jwt.sign({ user:user }, process.env.JWT_ACCESS_KEY);
}

const signup = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({email:req.body.email}).lean().exec();

        if(user) return res.status(500).send({Status:"Failed",message:"user exist"});

        user = await User.create(req.body);

        const token = newToken(user);

        res.json({user,token})
    } catch (e) {
        res.status(500).send({Status:"Failed",message:"registration failed"})
    }

   
}

const signin = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({email:req.body.email});

        if(!user) return res.status(500).send({Status:"Failed",message:"please provide correct email and password"});
        const match = await user.checkPassword(req.body.password);

        if(!match) return res.status(500).send({Status:"Failed",message:"please provide correct email and password"});

        const token = newToken(user);

        res.json({user,token})
    }
    catch(e){
        res.status(500).send({Status:"Failed",message:"Login failed"})
    }
}

module.exports = {signup,signin}