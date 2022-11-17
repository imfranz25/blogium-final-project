/* App and Database Init */
const app = require('./app');
const PORT = process.env.PORT || 8080;

/*
 * Connect to Database then Run Server
 */
const server = app.listen(PORT, () => {
  console.log(`Server running @ port ${PORT}`);
});

module.exports = server;
