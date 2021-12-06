const {Schema,model} = require('mongoose');

const booksSchema = Schema({
    book_name:{type:String,required:true},
    body:{type:String,required:true},
    author_ids:[{
        type:Schema.Types.ObjectId,
        ref:"author",
        required:true
    }],
    section_id:{type:Schema.Types.ObjectId,required:true}
},{
    versionKey:false,
    timestamps:true
})

module.exports = model("book",booksSchema);