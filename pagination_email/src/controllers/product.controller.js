const express = require('express');

const Product = require('../models/product.model');

const router = express.Router();

router.post('/', async(req,res)=>{
    try{
        const product = await Product.create(req.body);
        return res.send(product);
    }
    catch(e){
        res.status(500).json({status:"Failed",message:e.message});
    }
    

})

router.get('/', async(req,res)=>{
    try{
        const page = +req.query.page || 1;
        const size = +req.query.size || 2;

        const skip = (page-1)*size;

        const products = await Product.find().skip(skip).limit(size).lean().exec();

        const totalPages = Math.ceil((await Product.find().countDocuments())/size);

        return res.json({products,totalPages});
    }
    catch(e){
        res.status(500).json({status:"Failed",message:e.message});
    }
})

module.exports = router;