const Post = require('../models/post.model');
const User = require('../models/user.model');
const {body,validationResult} = require('express-validator');


const post = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findById(req.body.user_id);
        if(!user) return res.status(500).send({Status:"Failed",message:"Please register"});
       
        const newPost = await Post.create(req.body);
        res.send(newPost);

    } catch (e) {
        res.status(500).send({Status:"Failed",message:e.message})
    }
}

const getAllPosts = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findById(req.body.user_id);
        if(!user) return res.status(500).send({Status:"Failed",message:"Please register"});
       
        const posts = await Post.find().populate("user_id").lean().exec();
        res.send(posts);

    } catch (e) {
        res.status(500).send({Status:"Failed",message:e.message})
    }
}

module.exports = {post,getAllPosts}