/* Core Modules */
const path = require('path');

/* 3rd Party Modules */
const express = require('express');

/* File Imports */
const useRoutes = require('./routes');

/* Initialization */
const app = express();

/* Express Set-up -> Configs */
app.use(express.json());

/* Use all routes -> app.use(routes...) */
useRoutes(app);

module.exports = app;
