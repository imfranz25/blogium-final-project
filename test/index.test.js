/* User Input */
const { User, Blog } = require('../models');

/* Database connection waiting time -> 15 secs */
before((done) => {
  console.log('Waiting for database to connect...\n');
  setTimeout(() => {
    done();
  }, 15000);
});

describe('Auth API', function () {
  require('./auth.test');
});

describe('Blog API', function () {
  require('./blog.test');
});

/* Data Clean Up -> delete clear all the details */
after(async () => {
  try {
    await User.deleteMany();
    await Blog.deleteMany();
  } catch (error) {
    console.log(error);
  }
});
