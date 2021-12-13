const Movie = require('../models/movie.model');
const upload = require('../middleware/upload');
const express = require('express');
const router = express.Router();
const path = require('path');
router.post('/', upload.single("poster_url"), async(req,res)=>{
    try{
        const movie = await Movie.create({
            name:req.body.name,
            actors:req.body.actors,
            languages:req.body.languages,
            directors:req.body.directors,
            poster_url:req.file.path,
            user_id:req.body.user_id
        });

        res.send(movie);
    }
    catch(e){
        return res.send(500).send({status:"Failed",message:e.message});
    }
})

module.exports = router;