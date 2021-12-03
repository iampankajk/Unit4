const express = require('express');
const User = require('../models/user.model');

const { body, validationResult } = require('express-validator');


const router = express.Router();

router.post("/",
body("first_name").notEmpty(),
body("last_name").notEmpty(),
body("email").isEmail(),
body("pincode").isLength({min:6,max:6}),
body("age").isInt({ min: 1, max: 100 }),
body("gender").default("others")
,async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        const user = await User.create(req.body);

        return res.send(user);
    }
    catch(e){
        return res.status(500).json({status:"Failed",message:e.message});
    }
})

module.exports = router;