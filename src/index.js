const express = require('express');
const ejs  = require('ejs');
const path = require('path');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const staticPath = path.join(__dirname,'../public')

app.use(express.static(staticPath))

app.set('view engine', 'ejs');
app.get("/",(req,res)=>{
    res.render("index");
})



module.exports = app;