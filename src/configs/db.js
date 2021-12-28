const mongoose = require('mongoose');

module.exports = ()=>{
   return mongoose.connect("mongodb+srv://ranjan1501:ranjan1501@cluster0.6jqsa.mongodb.net/test")
}