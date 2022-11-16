/* Core Modules */
const path = require('path');

/* 3rd Party Modules */
const express = require('express');
const cors = require('cors');

/* File Imports */
const useRoutes = require('./routes');

/* Initialization */
const app = express();

/* Express Set-up -> Configs */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/* --------------- */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Use all routes -> app.use(routes...) */
useRoutes(app);

module.exports = app;
