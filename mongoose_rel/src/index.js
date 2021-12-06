const express = require('express');
const authorController = require('./controllers/author.controller');
const sectionController = require('./controllers/section.controller');
const bookController = require('./controllers/book.controller');
const checkoutController = require('./controllers/checkout.controller');


const app = express();

app.use(express.json());

app.use("/authors",authorController);
app.use("/sections",sectionController);
app.use("/books",bookController);
app.use("/checkouts",checkoutController);

module.exports = app;