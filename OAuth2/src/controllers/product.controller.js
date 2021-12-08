const express = require('express');
const authenticate = require('../middleware/authenticate');
const authorise = require("../middleware/authorise");
const Product = require('../models/product.model');
const router = express.Router();

router.post("/create",authenticate,authorise(["seller","admin"]),async (req,res)=>{
    try {
        const user = req.user;
        const product =await Product.create({
            name:req.body.name,
            body:req.body.body,
            user_id:user.user._id
        });
        res.send(product);

    } catch (e) {
        return res.status(500).send({Status:"Failed",message:e.message});
    }
});

router.get("/",authenticate,async(req,res)=>{

    try {
        const user = req.user;
        const product = await Product.find().lean().exec();

        res.send({product,user});
        

    } catch (e) {
        return res.status(500).send({Status:"Failed",message:e.message});
    }

})

module.exports = router;