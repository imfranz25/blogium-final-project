/* Core Modules */
const path = require('path');

/* 3rd Party Modules */
const express = require('express');

/* File Imports */
const useRoutes = require('./routes');

/* Initialization */
const app = express();

/* Express Set-up -> Configs */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
/* --------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/* Use all routes -> app.use(routes...) */
useRoutes(app);

module.exports = app;
