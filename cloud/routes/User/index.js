const createUser = require('./createUser');
const editPassword = require('./editPassword');
const editProfile = require('./editProfile');
const loginUser = require('./loginUser');
const {
  createUserValidator,
  editPasswordValidator,
  editUserValidator,
  loginUserValidator,
} = require('../../validators/userValidator');

module.exports = function () {
  Parse.Cloud.define('createUser', createUser, createUserValidator);
  Parse.Cloud.define('editProfile', editProfile, editUserValidator);
  Parse.Cloud.define('editPassword', editPassword, editPasswordValidator);
  Parse.Cloud.define('loginUser', loginUser, loginUserValidator);
};
