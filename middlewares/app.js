const express = require('express');

const users = require('./data.json');

const app = express();

// app.use(express.json());


const auth = (req,res,next)=>{
    console.log("before");
    next();
    console.log("after");
}

const autho = (req,res,next)=>{
    console.log("before");
    next();
    console.log("after");
}



app.get("/users",(req,res)=>{
    console.log("from inside GET All USERS");
    res.send(users);
});

app.post("/users", auth,autho,(req,res)=>{
    console.log("from inside POST Method");
    res.send(users);
});

app.get("/users/:email",(req,res)=>{
    console.log("from inside GET SINGLE USER");
    res.send(users);
});



app.listen(5000,(res,req)=>{
    console.log("app is listening on port 5000");
});