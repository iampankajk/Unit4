const mongoose = require('mongoose');

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

module.exports = mongoose.model("comment", commentSchema);