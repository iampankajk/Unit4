const express = require('express');

const app = express();

const users = require('./data.json');

app.use(express.json())


app.get('/',(req,res)=>{
    res.send("Welcome to Home Page");
});

app.get('/users',(req,res)=>{
    res.send(users);
});

app.post('/users',(req,res)=>{
    const newUser = [...users,req.body];
    res.send(newUser);
});

app.patch('/users/:email',(req,res)=>{
    const newUser =  users.map((user)=>{
        if(req.params.email==user.email){
            user=req.body
        }

        return user;
    });

    res.send(newUser);
})

app.listen(3000,()=>{
    console.log("listening on port 3000");
})

