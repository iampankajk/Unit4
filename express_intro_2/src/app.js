const express = require('express');

const connect = require('./config/db');

const usersController = require('./controllers/users.controller')
const tagsController = require('./controllers/tags.controller')
const postsController = require('./controllers/posts.controller')
const commentsController = require('./controllers/comments.controller')

const app = express();


app.use(express.json())

/*
1. connect to mongodb server
2. create a schema for data
3. create model for schema
*/


// for version 5.11.14

// const connect = ()=>{
//     return mongoose.connect("mongodb://127.0.0.1:27017/test",{
//         useNewUrlParser:true,
//         useCreateIndex:true,
//         useUnifiedTopology:true,
//     })
// }


app.use("/posts",postsController);
app.use("/tags",tagsController);
app.use("/comments",commentsController);
app.use("users",usersController);


app.listen(3000, async () => {
    await connect();
    console.log("listening on port 3000");
})

