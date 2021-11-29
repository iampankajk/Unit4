const express = require('express');
const app = express();

app.use(express.json())

const mongoose = require('mongoose');

const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/entertainment")
}

const movieSchema = new mongoose.Schema({
    movie_name: { type: String, required: true },
    movie_genre: { type: String, required: true },
    production_year: { type: Number, required: true },
    budget: { type: Number, required: true }
},{
    versionKey:false
});

const Movie = mongoose.model("movie",movieSchema);

app.post('/',async (req,res)=>{

    try{
        const movie=await Movie.create(req.body)
        res.send(movie)
    }catch(e){
        res.status(500).json({status:e.messege})
    }
   
});

app.get('/',async (req,res)=>{
    const movies =await Movie.find().lean().exec()
    res.send(movies)
});

app.get('/:id', async (req,res)=>{
    const movies =await Movie.find().lean().exec()
    const movie = movies.filter((movie)=>req.params.id==movie._id)

    // movie = await Movie.findById(req.params.id).lean().exec()
    res.send(movie);
})

app.patch('/:id', async (req,res)=>{
    const movie = await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec()
    res.send(movie)
})
app.delete('/:id', async (req,res)=>{
    const movie = await Movie.findByIdAndDelete(req.params.id).lean().exec()
    res.send(movie)
})


app.listen('2000', async () => {
    await connect()
    console.log('listen port 2000')
})