const Seat = require('../models/seat.model');

const express = require('express');
const router = express.Router();

router.post('/', async(req,res)=>{
    try{
        const seat = await Seat.create(req.body);

        res.send(seat);
    }
    catch(e){
        return res.send(500).send({status:"Failed",message:e.message});
    }
})
router.get('/', async(req,res)=>{
    try{
        const seats = await Seat.find().lean().exec();

        res.send(seats);
    }
    catch(e){
        return res.send(500).send({status:"Failed",message:e.message});
    }
})

module.exports = router;