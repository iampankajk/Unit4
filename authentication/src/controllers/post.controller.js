const express = require('express');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/post.model');
const router = express.Router();

router.post("/",authenticate,async (req,res)=>{
    try {
        const user = req.user;
        const post =await Post.create({
            title:req.body.title,
            body:req.body.body,
            user_id:user.user._id
        });
        res.send(post);

    } catch (e) {
        return res.status(500).send({Status:"Failed",message:e.message});
    }
});

router.get("/",authenticate,async(req,res)=>{

    try {
        const user = req.user;
        const posts = await Post.find().lean().exec();

        res.send({posts,user});
        

    } catch (e) {
        return res.status(500).send({Status:"Failed",message:e.message});
    }

})

module.exports = router;