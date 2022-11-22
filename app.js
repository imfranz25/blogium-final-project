/* 3rd Party Modules */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');

/* File Imports */
const useRoutes = require('./routes');
const { multerUpload } = require('./helpers');

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
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads', 'images')));
app.use(
  multer({
    storage: multerUpload.fileStorage,
    fileFilter: multerUpload.fileFilter,
  }).single('profile_picture_url')
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
