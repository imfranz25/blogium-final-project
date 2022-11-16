// 3rd Party Modules
const express = require('express');
const bodyParser = require('body-parser');

// Initialization
const app = express();

// Express Set-up
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = app;
