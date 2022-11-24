/* Core Modules */
const path = require('path');

/* 3rd Party Modules */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');

/* File Imports */
const useRoutes = require('./routes');
const { multerUpload } = require('./utils');

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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* prettier-ignore */
app.use(
  '/public/uploads/profiles',
  express.static(path.join(__dirname, 'public', 'uploads', 'profiles'))
);
/* prettier-ignore */
app.use(
  '/public/uploads/blogs', 
  express.static(path.join(__dirname, 'public', 'uploads', 'blogs')
));

/* File Upload for Profile Picture */
app.use(
  multer({
    storage: multerUpload.fileStorage,
    fileFilter: multerUpload.fileFilter,
    limits: multerUpload.fileLimits, // file limit 10 mb
  }).fields(multerUpload.fileFields)
);

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
