const express  = require('express');

const users = require('./books_data.json');

const app = express();

app.use(express.json());

const logger = (req,res,next)=>{
    const user = users.filter((user)=>req.params.name===user.author_name);
   console.log("middleware")
    res.json([{"api_requested by":req.params.name}, {"book":`${user[0].book_name}`}]);
    next();
}

app.get('/',(req,res)=>{
    res.send(users);
})

app.get('/books/:id',(req,res)=>{
    const userId = users.filter((user)=>{return user.id.id===req.params.id});

    res.send(userId);
});

app.get('/:name',logger,(req,res)=>{
    
    console.log("YES");
})

app.patch('/books/:id',(req,res)=>{

    const newUser = users.map((user)=>{

        if(user.id.id===req.params.id){
           
            if(req?.body?.author_name) user.author_name = req.body.author_name;
            if(req?.body?.book_name) user.book_name = req.body.book_name;
            if(req?.body?.email) user.email = req.body.email;
            if(req?.body?.pages) user.pages = req.body.pages;
            if(req?.body?.year) user.year = req.body.year;
            if(req?.body?.id) user.id.id = req.body.id.id   

        }

        return user

    });


    res.send(newUser);
})


app.post('/books',(req,res)=>{
    let newUser = [...users, req.body];
    res.send(newUser);
})


app.delete('/books/:id',(req,res)=>{

    const userId = users.filter((user)=>{return user.id.id!==req.params.id});

    res.send(userId);

})



app.listen(2345,(req,res)=>{
    console.log("app is listening on port 2345")
})