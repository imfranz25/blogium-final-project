const createUser = require('./createUser');
const { createUserValidator } = require('../../validators/userValidator');

module.exports = function () {
  Parse.Cloud.define('createNewUser', createUser, createUserValidator);
};
