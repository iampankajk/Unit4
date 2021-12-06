const express = require('express');
const Author = require('../models/author.model');




const router = express.Router();

router.get("/", async(req,res)=>{
    try{
        const authors = await Author.find().lean().exec();
        return res.send(authors);
    }
    catch(e){
        return res.status(500).json({status:"Failed",message:e.message});
    }
});

router.post("/", async(req,res)=>{
    try{
        const author = await Author.create(req.body);
        return res.send(author);
    }
    catch(e){
        return res.status(500).json({status:"Failed",message:e.message});
    }
})

module.exports = router;