/* 3rd Party Modules */
const bcrypt = require('bcrypt');

const createUser = async req => {
  try {
    const { firstName, lastName, userName, email, password, confirmPassword } = req.params;

    if (password !== confirmPassword) {
      throw new Parse.Error(422, 'Password and Confirm Password does not match');
    }

    const newACL = new Parse.ACL();
    const newUser = new Parse.User();
    const hashedPassword = await bcrypt.hash(password, 12);

    newACL.setPublicReadAccess(true);
    newACL.setPublicWriteAccess(true);

    newUser.setACL(newACL);
    newUser.set('first_name', firstName);
    newUser.set('last_name', lastName);
    newUser.set('username', userName);
    newUser.set('email', email);
    newUser.set('password', hashedPassword);

    await newUser.signUp();

    return 'Sign up success';
  } catch (error) {
    let errorType = Parse.Error.INTERNAL_SERVER_ERROR;

    if (error.code === 422) {
      errorType = Parse.Error.VALIDATION_ERROR;
    }

    throw new Parse.Error(errorType, error.message);
  }
};

module.exports = createUser;