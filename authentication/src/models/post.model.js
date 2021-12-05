const {Schema,model} = require('mongoose');


const postsSchema = Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    user_id:{type:Schema.Types.ObjectId,
        ref:"user",
        required:true},
},{
    versionKey:false,
    timestamps:true
})

module.exports = model("post",postsSchema);