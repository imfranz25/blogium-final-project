/* 3rd Party Modules */
const express = require('express');
const mongoose = require('mongoose');

/* File Imports */
const useRoutes = require('./routes');

/* Initialization */
const app = express();
require('dotenv').config();

/* Database Configs -> set database URI based on the node environment */
let MONGO_URI;

if (process.env.NODE_ENV === 'TEST') {
  MONGO_URI = process.env.MONGO_URI_TEST;
} else {
  MONGO_URI = process.env.MONGO_URI;
}

/* Express Set-up -> Configs */
app.use(express.json());

/* Use all routes -> app.use(routes...) */
useRoutes(app);

/* Connect to MongoDB */
mongoose
  .connect(MONGO_URI, () => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.log(`MongoDB connection error -> ${err}`);
  });

module.exports = app;
