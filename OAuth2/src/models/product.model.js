const {Schema,model} = require('mongoose');


const productsSchema = Schema({
    name:{type:String,required:true},
    body:{type:String,required:true},
    user_id:{type:Schema.Types.ObjectId,
        ref:"user",
        required:true},
},{
    versionKey:false,
    timestamps:true
})

module.exports = model("product",productsSchema);