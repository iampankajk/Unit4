const Theatre = require('../models/theatre.model');

const express = require('express');
const router = express.Router();

router.post('/', async(req,res)=>{
    try{
        const theatre = await Theatre.create(req.body);

        res.send(theatre);
    }
    catch(e){
        return res.send(500).send({status:"Failed",message:e.message});
    }
})
router.get('/', async(req,res)=>{
    try{
        const theatres = await Theatre.find().lean().exec();

        res.send(theatres);
    }
    catch(e){
        return res.send(500).send({status:"Failed",message:e.message});
    }
})

module.exports = router;