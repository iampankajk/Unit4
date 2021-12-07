const {Schema,model} = require('mongoose');
const bcrypt = require('bcryptjs');

const usersSchema = Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
},{
    versionKey:false,
    timestamps:true
})

usersSchema.pre("save", function (next){
    if(!this.isModified("password")) return next();
        bcrypt.hash(this.password, 10, (err, hash)=> {
            this.password=hash;
            return next();
        });
   
});

usersSchema.methods.checkPassword = function(password){

    return new Promise((resolve,reject)=>{
        bcrypt.compare(password,this.password, function(err, same) {
            if(err) return reject(err);
            return resolve(same);
        });
    })

}

module.exports = model("user",usersSchema);