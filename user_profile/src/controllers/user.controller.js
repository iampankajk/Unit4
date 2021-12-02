const express = require('express');

const upload = require('../middleware/upload');
const User = require('../models/user.model');
const router = express.Router();


router.post('/multiple', upload.any("profile_url"), async(req,res)=>{
    try{
        const filePaths = req.files.map(file=>file.path);

        const user = await User.create({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            profile_pic:filePaths,
        });

        res.send(user);
    }
    catch(e){
        return res.status(500).send({status:"Failed",message:e.message});
    }
})

module.exports = router;