const express = require('express');
const fs = require('fs');
const productController=require("./controllers/car.controllers");
const app = express();
app.use(express.json());
const path= require('path');
// app.use(express.static("public"))

// app.use(express.static(__dirname + '/public'));
const staticPath = path.join(__dirname,'../public')

app.use(express.static(staticPath))

app.set('view engine', 'ejs')

app.use("/",productController);



module.exports =app; 