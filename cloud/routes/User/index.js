const createUser = require('./createUser');
const editPassword = require('./editPassword');
const editProfile = require('./editProfile');
const {
  createUserValidator,
  editPasswordValidator,
  editUserValidator,
} = require('../../validators/userValidator');

module.exports = function () {
  Parse.Cloud.define('createNewUser', createUser, createUserValidator);
  Parse.Cloud.define('editProfile', editProfile, editUserValidator);
  Parse.Cloud.define('editPassword', editPassword, editPasswordValidator);
};
