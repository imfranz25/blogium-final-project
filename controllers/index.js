const authControllers = require('./auth.controller');
const errorControllers = require('./error.controller');
const blogControllers = require('./blog.controller');

module.exports = {
  authControllers,
  blogControllers,
  errorControllers,
};
