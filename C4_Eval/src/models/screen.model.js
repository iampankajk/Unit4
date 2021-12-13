const {Schema,model} = require('mongoose');


const screensSchema = Schema({
    name:{type:String,required:true},
    theatre:{type:Schema.Types.ObjectId,
        required:true,
        ref:"theatre"
    }
},{
    versionKey:false,
    timestamps:true
})

module.exports = model("screen",screensSchema);