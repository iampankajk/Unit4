const express = require('express');
const User = require('../models/user.model');

const sendMail = require('../utils/send-mail');



const router = express.Router();

router.get("/", async(req,res)=>{
    try{

        // paginated users
        const page = +req.query.page || 1;
        const size = +req.query.size || 2;

        const skip = (page-1)*size;

        const users = await User.find().skip(skip).limit(size).lean().exec();
        const totalPages = Math.ceil((await User.find().countDocuments())/size);
        return res.send({users,totalPages});
    }
    catch(e){
        return res.status(500).json({status:"Failed",message:e.message});
    }
});

router.post("/", async(req,res)=>{
    try{
        const user = await User.create(req.body);

        const list =[
            "a@gmail.com",
            "b@gmail.com",
            "c@gmail.com",
            "d@gmail.com",
            "e@gmail.com"
        ]
        const admins = list.join(",");
        sendMail(admins,
        req.body.email,
        `Welcome to ABC system`,
        `Hi ${req.body.first_name} ${req.body.last_name}`,
        "<h1>Welcome to ABC System<h1>");

        return res.send(user);
    }
    catch(e){
        return res.status(500).json({status:"Failed",message:e.message});
    }
})

module.exports = router;