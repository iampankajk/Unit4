const {Schema,model} = require('mongoose');


const seatsSchema = Schema({
   show:{
       type:Schema.Types.ObjectId,
       ref:"show",
       required:true
   }
},{
    versionKey:false,
    timestamps:true
})

module.exports = model("seat",seatsSchema);