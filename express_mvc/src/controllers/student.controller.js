const express = require('express');
const Student = require('../models/student.model');
const Evaluation = require('../models/evaluation.model');


const router = express.Router();

router.post("/", async(req,res)=>{
    try{
        const student = await Student.create(req.body);

        return res.send(student);
    }
    catch(e){
        return res.status(500).json({status:"Failed",message:e.message});
    }
});

router.get("/top", async(req,res)=>{
    try{
        const student = await Evaluation.find().sort({marks:-1}).limit(1).lean().exec();
        return res.send(student);
    }
    catch(e){
        return res.status(500).json({status:"Failed",message:e.message});
    }
});

router.get("/:eval", async(req,res)=>{
    try{
        const evaluations = await Evaluation.find({topic:req.params.eval}).populate("student").lean().exec();
        return res.send(evaluations);
    }
    catch(e){
        return res.status(500).json({status:"Failed",message:e.message});
    }
});




module.exports = router;