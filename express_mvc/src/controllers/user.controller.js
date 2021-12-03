const express = require('express');
const User = require('../models/user.model');


const router = express.Router();

router.post("/", async(req,res)=>{
    try{
        const user = await User.create(req.body);

        return res.send(user);
    }
    catch(e){
        return res.status(500).json({status:"Failed",message:e.message});
    }
})

module.exports = router;