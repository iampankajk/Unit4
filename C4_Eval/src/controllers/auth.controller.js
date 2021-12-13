const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const newToken = (user)=>{
    return jwt.sign({ user:user }, process.env.JWT_ACCESS_KEY);
}

const signup = async (req,res)=>{
    try {
        let user = await User.findOne({email:req.body.email}).lean().exec();

        if(user) return res.status(500).send({Status:"Failed",message:"user exist"});

        user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            profile_photo_url:req.file.path,
            roles:req.body.roles
        });

        const token = newToken(user);

        res.json({user,token})
    } catch (e) {
        res.status(500).send({Status:"Failed",message:"registration failed"})
    }

   
}

const signin = async (req,res)=>{
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