const {Schema,model} = require('mongoose');

const checkoutSchema = Schema({
    book_id:{
        type:Schema.Types.ObjectId,
        ref:"book",
        unique:true,
        required:true
    },
    author_id:{
        type:Schema.Types.ObjectId,
        ref:"author",
        required:true,
    },
},{
    versionKey:false,
    timestamps:true
})

module.exports = model("checkout",checkoutSchema);