const express = require('express');
const fs = require('fs');


const upload = require('../middleware/upload');
const User = require('../models/user.model');
const router = express.Router();


router.post('/multiple', upload.single("profile_url"), async(req,res)=>{
    try{

        const user = await User.create({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            profile_pic:req.file.path,
        });

        res.send(user);
    }
    catch(e){
        return res.status(500).send({status:"Failed",message:e.message});
    }
});

router.get('/',async (req,res)=>{
    try{
        const users = await User.find().lean().exec();

        return res.send(users);
    }
    catch(e){
        return res.status(500).send({status:"Failed",message:e.message});
    }
})

router.patch('/multiple/:id', upload.single("profile_url"), async(req,res)=>{

    
    try{

       const user  = await User.findById(req.params.id);
       await fs.unlinkSync(user.profile_pic)
 
       const newUser = await User.findByIdAndUpdate(req.params.id,{profile_pic:req.file.path},{new:true});

        res.send(newUser);
    }
    catch(e){
        return res.status(500).send({status:"Failed",message:e.message});
    }
});


// need to modify delete
router.delete('/multiple/:id', upload.single("profile_url"), async(req,res)=>{

    
    try{

       const user  = await User.findById(req.params.id);
       await fs.unlinkSync(user.profile_pic)
 
       const newUser = await User.findByIdAndUpdate(req.params.id,{profile_pic:req.file.path},{new:true});

        res.send(newUser);
    }
    catch(e){
        return res.status(500).send({status:"Failed",message:e.message});
    }
});



module.exports = router;