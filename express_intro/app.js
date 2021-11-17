const express = require('express');

const app = express();

const users = require('./data.json')


app.get('/',(req,res)=>{
    res.send("Welcome to Home Page");
})

app.get('/users',(req,res)=>{
    res.send(users);
})

app.listen(3000,()=>{
    console.log("listening on port 3000");
})

