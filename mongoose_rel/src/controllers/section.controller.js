const express = require('express');
const Section = require('../models/section.model');




const router = express.Router();

router.get("/", async(req,res)=>{
    try{
        const sections = await Section.find().lean().exec();
        return res.send(sections);
    }
    catch(e){
        return res.status(500).json({status:"Failed",message:e.message});
    }
});

router.get("/:name", async(req,res)=>{
    try{
        const sections = await Section.find({section_name:req.params.name}).lean().exec();
        return res.send(sections);
    }
    catch(e){
        return res.status(500).json({status:"Failed",message:e.message});
    }
});

router.post("/", async(req,res)=>{
    try{
        const section = await Section.create(req.body);
        return res.send(section);
    }
    catch(e){
        return res.status(500).json({status:"Failed",message:e.message});
    }
})

module.exports = router;