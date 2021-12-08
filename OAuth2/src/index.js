const express = require('express');
const {signup,signin} = require('./controllers/auth.controller');
const productController = require('./controllers/product.controller');
const { body,validationResult} = require('express-validator');

const passport = require('./configs/passport');


const app = express();

app.use(express.json());

app.use(passport.initialize());

passport.serializeUser(function ({ user, token }, done) {
    done(null, { user, token });
  });
  passport.deserializeUser(function (user, done) {
    done(err, user);
  });

app.post("/signup",
body("email").isEmail(),
body("password").isLength({min:8}).isStrongPassword().withMessage("write strong password, Use at least 1 uppercase,lowercase,number,and symbol with min 8 length of password"),
signup);

app.post("/signin",
body("email").isEmail(),
body("password").isLength({min:8}).isStrongPassword().withMessage("write strong password, Use at least 1 uppercase,lowercase,number,and symbol with min 8 length of password"),
signin);

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.use("/",productController);

app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/auth/google/failure",
    }),
    function (req, res) {
      return res.status(201).json({ user: req.user.user, token: req.user.token });
    }
  );
  
  app.get("/auth/google/failure", function (req, res) {
    return res.send("Something went wrong");
  });





module.exports = app;