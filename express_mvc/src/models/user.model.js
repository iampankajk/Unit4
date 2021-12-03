const {Schema,model} = require('mongoose');

const usersSchema = Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    gender:{type:String,required:true},
    dob:{type:String,required:true}
},{
    versionKey:false,
    timestamps:true
})

module.exports = model("user",usersSchema);