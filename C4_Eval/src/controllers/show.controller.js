const Show = require('../models/show.model');

const express = require('express');
const router = express.Router();

router.post('/', async(req,res)=>{
    try{
        const show = await Show.create(req.body);

        res.send(show);
    }
    catch(e){
        return res.send(500).send({status:"Failed",message:e.message});
    }
})
router.get('/', async(req,res)=>{
    try{
        const shows = await Show.find().lean().exec();

        res.send(shows);
    }
    catch(e){
        return res.send(500).send({status:"Failed",message:e.message});
    }
})

module.exports = router;