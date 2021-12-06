const express = require('express');
const Book = require('../models/book.model');




const router = express.Router();

router.get("/", async(req,res)=>{
    try{
        const books = await Book.find().populate("author_ids").lean().exec();
        return res.send(books);
    }
    catch(e){
        return res.status(500).json({status:"Failed",message:e.message});
    }
});
router.get("/:author_id", async(req,res)=>{
    try{
        const book = await Book.find({author_ids: { $in: [req.params.author_id]}}).lean().exec();
        return res.send(book);
    }
    catch(e){
        return res.status(500).json({status:"Failed",message:e.message});
    }
});

router.post("/", async(req,res)=>{
    try{
        const book = await Book.create(req.body);
        return res.send(book);
    }
    catch(e){
        return res.status(500).json({status:"Failed",message:e.message});
    }
})

module.exports = router;