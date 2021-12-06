const {Schema,model} = require('mongoose');

const authorsSchema = Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
},{
    versionKey:false,
    timestamps:true
})

module.exports = model("author",authorsSchema);