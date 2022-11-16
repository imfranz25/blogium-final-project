const app = require('./app');
const PORT = process.env.PORT || 8080;

/*
 * Run Server
 */
app.listen(PORT, () => {
  console.log(`Server running @ port ${PORT}`);
});
