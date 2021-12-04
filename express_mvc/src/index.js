const express = require('express');
const userController = require('./controllers/user.controller');
const studentController = require('./controllers/student.controller');
const evaluationController  = require('./controllers/evaluation.controller');

const app = express();

app.use(express.json());

app.use("/users",userController);
app.use("/students",studentController);
app.use("/evaluations",evaluationController);

module.exports = app;