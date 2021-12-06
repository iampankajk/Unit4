const express = require('express');
const Checkout = require('../models/checkout.model');




const router = express.Router();

router.get("/", async(req,res)=>{
    try{
        const checkouts = await Checkout.find().populate("book_id").populate("author_id").lean().exec();
        return res.send(checkouts);
    }
    catch(e){
        return res.status(500).json({status:"Failed",message:e.message});
    }
});

router.post("/", async(req,res)=>{
    try{
        const checkout = await Checkout.create(req.body);
        return res.send(checkout);
    }
    catch(e){
        return res.status(500).json({status:"Failed",message:e.message});
    }
})

module.exports = router;