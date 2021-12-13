const express = require('express');
const ejs  = require('ejs');




const productsController = require('./controllers/product.controller');

const app = express();
app.use(express.json());

app.set('view engine', 'ejs');
app.use("/products",productsController);
app.get("/",(req,res)=>{
    res.render("index");
})



module.exports = app;