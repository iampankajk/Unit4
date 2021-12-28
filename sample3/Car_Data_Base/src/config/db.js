const mongoose = require('mongoose');
const connect= ()=> {
    return mongoose.connect("mongodb+srv://ranjan1501:ranjan1501@cluster0.6jqsa.mongodb.net/carDatabase",{

    });
};

module.exports = connect;
