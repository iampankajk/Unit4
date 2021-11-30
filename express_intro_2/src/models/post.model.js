const mongoose = require('mongoose');
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

module.exports = mongoose.model("post",postSchema);