const Screen = require('../models/screen.model');

const express = require('express');
const router = express.Router();

router.post('/', async(req,res)=>{
    try{
        const screen = await Screen.create(req.body);

        res.send(screen);
    }
    catch(e){
        return res.send(500).send({status:"Failed",message:e.message});
    }
})
router.get('/', async(req,res)=>{
    try{
        const screens = await Screen.find().lean().exec();

        res.send(screens);
    }
    catch(e){
        return res.send(500).send({status:"Failed",message:e.message});
    }
})

module.exports = router;