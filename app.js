const express = require("express");
const bodyParser = require("body-parser");
const routes = require('./routes/index');

const app = express();

//! middleware for us to send requests as json for POST
app.use(bodyParser.json());

//! routes middleware
app.use('/', routes);

//! middleware function to handle errors --> has to be after get
app.use((err, req, res, next) => {
  res.json(err);
});

module.exports = app;
