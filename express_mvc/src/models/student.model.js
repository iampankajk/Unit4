const {Schema,model} = require('mongoose');

const studentsSchema = Schema({
    roll_id:{type:Number,required:true},
    current_batch:{type:String,required:true},
    user_id:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
},{
    versionKey:false,
    timestamps:true
})

module.exports = model("student",studentsSchema);