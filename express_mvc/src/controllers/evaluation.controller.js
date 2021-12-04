const express = require('express');
const Evaluation = require('../models/evaluation.model');


const router = express.Router();

router.post("/", async(req,res)=>{
    try{
        const evaluation = await Evaluation.create(req.body);

        return res.send(evaluation);
    }
    catch(e){
        return res.status(500).json({status:"Failed",message:e.message});
    }
})

module.exports = router;