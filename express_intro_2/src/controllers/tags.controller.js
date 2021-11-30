const express = require('express');

const Tag = require('../models/tag.model')

const router = express.Router();


// ----------------Tag Crud----------

router.post('/', async (req,res)=>{
    try{
    const tag = await Tag.create(req.body);
    return res.status(201).send(tag);
    }

    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
    
});

router.get('/', async (req,res)=>{
    try{
        const tags = await Tag.find().lean().exec();
        return res.send(tags);
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})

router.get('/:id', async (req,res)=>{
    try{
        const tag = await Tag.findById(req.params.id).lean().exec();
        return res.send(tag);
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
});
router.get('/:id/posts', async (req,res)=>{
    try{
        const tag = await Tag.findById(req.params.id).lean().exec();
        const posts = await Post.find({tag_ids: tag._id}).populate("tag_ids").populate("user_id").lean().exec();
        return res.send({posts,tag});
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
});

router.patch('/:id', async (req,res)=>{
    try{
        const tag = await Tag.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
        return res.status(200).send(tag);
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
});

router.delete('/:id', async (req,res)=>{
    try{
        const tag = await Tag.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(tag);
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})


module.exports = router;