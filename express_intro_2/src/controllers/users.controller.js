const express = require('express');

const User = require('../models/user.model')

const router = express.Router();


// users crud
router.post('/', async (req, res) => {
    const user = await User.create(req.body);

    res.status(201).send(user);
});



router.get('/', (req, res) => {
    res.send("Welcome to Home Page");
});

router.get('/', async (req, res) => {
    const user = await User.find().lean().exec();
    res.send(user);
});



router.patch('/:email', (req, res) => {
    const newUser = users.map((user) => {
        if (req.params.email == user.email) {
            user = req.body
        }

        return user;
    });

    res.send(newUser);
})

module.exports = router;