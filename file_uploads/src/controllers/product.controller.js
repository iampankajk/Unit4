const express = require('express');

const upload = require('../middleware/upload');
const Product = require('../models/product.model');
const router = express.Router();

router.post('/', upload.single("productImage"), async(req,res)=>{
    try{
        const product = await Product.create({
            name:req.body.name,
            price:req.body.price,
            image_urls:req.file.path,
        });

        res.send(product);
    }
    catch(e){
        return res.send(500).send({status:"Failed",message:e.message});
    }
})
router.post('/multiple', upload.any("image_urls"), async(req,res)=>{
    try{
        const filePaths = req.files.map(file=>file.path);

        const product = await Product.create({
            name:req.body.name,
            price:req.body.price,
            image_urls:filePaths,
        });

        res.send(product);
    }
    catch(e){
        return res.send(500).send({status:"Failed",message:e.message});
    }
})

module.exports = router;