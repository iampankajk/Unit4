const {Schema,model} = require('mongoose');

const sectionsSchema = Schema({
    section_name:{type:String,required:true},
},{
    versionKey:false,
    timestamps:true
})

module.exports = model("section",sectionsSchema);