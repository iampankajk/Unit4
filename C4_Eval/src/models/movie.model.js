const {Schema,model} = require('mongoose');


const moviesSchema = Schema({
    name:{type:String,required:true},
    actors:[{type:String,required:true}],
    languages:[{type:String,required:true}],
    directors:[{type:String,required:true}],
    poster_url:{type:String,required:true},
    user_id:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
},{
    versionKey:false,
    timestamps:true
})

module.exports = model("movie",moviesSchema);