const express = require('express');
const Student = require('../models/student.model');


const router = express.Router();

router.post("/", async(req,res)=>{
    try{
        const student = await Student.create(req.body);

        return res.send(student);
    }
    catch(e){
        return res.status(500).json({status:"Failed",message:e.message});
    }
})

module.exports = router;