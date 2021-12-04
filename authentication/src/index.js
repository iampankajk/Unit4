const express = require('express');
const {signup,signin} = require('./controllers/auth.controller');

const { body,validationResult} = require('express-validator');


const app = express();

app.use(express.json());

app.post("/signup",
body("name").notEmpty(),
body("email").isEmail(),
body("password").isLength({min:8}).isStrongPassword().withMessage("write strong password, Use at least 1 uppercase,lowercase,number,and symbol with min 8 length of password"),
signup);

app.post("/signin",
body("email").isEmail(),
body("password").isLength({min:8}).isStrongPassword().withMessage("write strong password, Use at least 1 uppercase,lowercase,number,and symbol with min 8 length of password"),
signin);




module.exports = app;