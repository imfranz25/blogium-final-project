/* 3rd Party Module(s) */
const mongoose = require('mongoose');

/* App and Database Init */
const app = require('./app');
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

/*
 * Connect to Database then Run Server
 */
const server = mongoose
  .connect(MONGO_URI)
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Database connected - Server running @ port ${PORT}`);
    });

    return app;
  })
  .catch((err) => console.log(err));

module.exports = server;
