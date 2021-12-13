const express = require('express');
const {signup,signin} = require('./controllers/auth.controller');
const movieController = require('./controllers/movie.controller')


const upload = require('./middleware/upload');

const app = express();

app.use(express.json());

app.post("/signup",upload.single("photo_url"),signup);

app.post("/signin",signin);

app.use("/movies",movieController);





module.exports = app;