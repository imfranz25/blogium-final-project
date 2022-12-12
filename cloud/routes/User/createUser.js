const bycrypt = require('bycrypt');
const parseErrorHandler = require('../../helpers/parseErrorHandler');

const createUser = async req => {
  const { first_name, last_name, username, email, password, confirm_password } = req.params;

  if (password !== confirm_password) {
    throw parseErrorHandler('Password and Confirm Password does not match');
  }

  try {
    const newACL = new Parse.ACL();
    const newUser = new Parse.User();
    const hashedPassword = await bycrypt.hash(password, 12);

    newACL.setPublicReadAccess(true);
    newACL.setPublicWriteAccess(true);

    newUser.setACL(newACL);
    newUser.set('first_name', first_name);
    newUser.set('last_name', last_name);
    newUser.set('username', username);
    newUser.set('email', email);
    newUser.set('password', hashedPassword);

    try {
      await newUser.signUp();
    } catch (error) {
      throw Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
    }

    return 'Sign up Success';
  } catch (error) {
    throw Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = createUser;
