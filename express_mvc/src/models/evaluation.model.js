const {Schema,model} = require('mongoose');

const evaluationsSchema = Schema({
    date:{type:String,required:true},
    marks:{type:Number,required:true},
    topic:{type:String,required:true},
    student_id:{
        type:Schema.Types.ObjectId,
        ref:"student",
        required:true
    },
    ia_id:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
},{
    versionKey:false,
    timestamps:true
})

module.exports = model("evaluation",evaluationsSchema);