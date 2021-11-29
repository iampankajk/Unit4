const express = require('express');
const mongoose = require('mongoose');

const app = express();

const users = require('./data.json');

app.use(express.json())

/*
1. connect to mongodb server
2. create a schema for data
3. create model for schema
*/


// for version 5.11.14

// const connect = ()=>{
//     return mongoose.connect("mongodb://127.0.0.1:27017/test",{
//         useNewUrlParser:true,
//         useCreateIndex:true,
//         useUnifiedTopology:true,
//     })
// }



// step 1
const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/test");
}

// step 2
const userSchema = new mongoose.Schema({
    first_name: {type:String,required:true},
    last_name:  {type:String,required:false},
    email:  {type:String,required:true},
    gender: {type:String,required:false,default:"Male"},
    age:    {type:Number,required:true},

},{
    versionKey:false,
    timestamps:true,
});

// step 3

const User = mongoose.model("user", userSchema);

// post schema

const postSchema = new mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    tag_ids:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"tag",
        required:true,
    }],
},{
    versionKey:false,
    timestamps:true,
});

const Post = mongoose.model("post",postSchema);

// comment Schema

const commentSchema = new mongoose.Schema({
    body:{type:String,required:true},
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    post_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post",
        required:true,

    }
},{
    versionKey:false,
    timestamps:true,
});

const Comment = mongoose.model("comment", commentSchema);

// tag schema
const tagSchema = new mongoose.Schema({
    name:{type:String,required:true}
},{
    versionKey:false,
    timestamps:true,
});

const Tag = mongoose.model("tag",tagSchema);

// users crud
app.post('/users', async (req, res) => {
    const user = await User.create(req.body);

    res.status(201).send(user);
});



app.get('/', (req, res) => {
    res.send("Welcome to Home Page");
});

app.get('/users', async (req, res) => {
    const user = await User.find().lean().exec();
    res.send(user);
});



app.patch('/users/:email', (req, res) => {
    const newUser = users.map((user) => {
        if (req.params.email == user.email) {
            user = req.body
        }

        return user;
    });

    res.send(newUser);
})


// ----------------Tag Crud----------

app.post('/tags', async (req,res)=>{
    try{
    const tag = await Tag.create(req.body);
    return res.status(201).send(tag);
    }

    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
    
});

app.get('/tags', async (req,res)=>{
    try{
        const tags = await Tag.find().lean().exec();
        return res.send(tags);
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})

app.get('/tags/:id', async (req,res)=>{
    try{
        const tag = await Tag.findById(req.params.id).lean().exec();
        return res.send(tag);
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
});
app.get('/tags/:id/posts', async (req,res)=>{
    try{
        const tag = await Tag.findById(req.params.id).lean().exec();
        const posts = await Post.find({tag_ids: tag._id}).populate("tag_ids").populate("user_id").lean().exec();
        return res.send({posts,tag});
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
});

app.patch('/tags/:id', async (req,res)=>{
    try{
        const tag = await Tag.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
        return res.status(200).send(tag);
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
});

app.delete('/tags/:id', async (req,res)=>{
    try{
        const tag = await Tag.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(tag);
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})

// POST CRUD

app.post('/posts', async (req,res)=>{
    try{
        const post = await Post.create(req.body);
        return res.status(201).send(post)
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})

app.get('/posts', async (req,res)=>{
    try{
        const posts = await Post.find().populate("user_id").populate("tag_ids").lean().exec();
        return res.status(201).send(posts)
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})

app.get('/posts/:id', async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id).lean().exec();
        return res.status(201).send(post)
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})
app.patch('/posts/:id', async (req,res)=>{
    try{
        const post = await Post.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
        return res.status(201).send(post)
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})
app.delete('/posts/:id', async (req,res)=>{
    try{
        const post = await Post.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(post)
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})

// comments CRUD

app.post('/comments', async (req,res)=>{
    try{
        const comment = await Comment.create(req.body);
        return res.status(201).send(comment)
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})

app.get('/comments', async (req,res)=>{
    try{
        const comments = await Comment.find().lean().exec();
        return res.status(201).send(comments)
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})

app.get('/comments/:id', async (req,res)=>{
    try{
        const comment = await Comment.findById(req.params.id).lean().exec();
        return res.status(201).send(comment)
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})
app.patch('/comments/:id', async (req,res)=>{
    try{
        const comment = await Comment.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
        return res.status(201).send(comment)
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})
app.delete('/comments/:id', async (req,res)=>{
    try{
        const comment = await Comment.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(comment)
    }
    catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})

app.listen(3000, async () => {
    await connect();
    console.log("listening on port 3000");
})

