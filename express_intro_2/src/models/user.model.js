const mongoose = require('mongoose');

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

module.exports = mongoose.model("user", userSchema);
