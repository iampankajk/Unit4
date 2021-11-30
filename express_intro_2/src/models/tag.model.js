const mongoose = require('mongoose');

// tag schema
const tagSchema = new mongoose.Schema({
    name:{type:String,required:true}
},{
    versionKey:false,
    timestamps:true,
});

module.exports= mongoose.model("tag",tagSchema);