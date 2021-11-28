const express = require('express');
const mongoose = require('mongoose');

const app = express();

const users = require('./data.json');

app.use(express.json())

/*
1. connect to mongodb server
2. create a schema for data
3. create model for schema
*/

// step 1
const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/test");
}

// step 2
const userSchema = new mongoose.Schema({
    first_name: {type:String,required:true},
    last_name:  {type:String,required:false},
    email:  {type:String,required:true},
    gender: {type:String,required:false,default:"Male"},
    age:    {type:Number,required:true},

});

// step 3

const User = mongoose.model("user", userSchema);

app.post('/users', (req, res) => {
    const newUser = [...users, req.body];
    res.send(newUser);
});



app.get('/', (req, res) => {
    res.send("Welcome to Home Page");
});

app.get('/users', (req, res) => {
    res.send(users);
});



app.patch('/users/:email', (req, res) => {
    const newUser = users.map((user) => {
        if (req.params.email == user.email) {
            user = req.body
        }

        return user;
    });

    res.send(newUser);
})

app.listen(3000, async () => {
    await connect();
    console.log("listening on port 3000");
})

