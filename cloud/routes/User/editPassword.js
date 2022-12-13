/* 3rd Party Modules */
const bcrypt = require('bcrypt');

const editPassword = async req => {
  try {
    const { newPassword, confirmPassword, currentPassword, userId } = req.params;

    if (newPassword !== confirmPassword) {
      throw Parse.Error(
        Parse.Error.VALIDATION_ERROR,
        'Password and Confirm Password does not match'
      );
    }

    /* prettier-ignore */
    const existingUser = await new Parse.Query(Parse.User)
      .equalTo('objectId', userId)
      .first();

    if (!existingUser) {
      throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'User does not exist');
    }

    const savedPassword = existingUser.get('password');
    const isMatched = await bcrypt.compare(currentPassword, savedPassword);

    if (!isMatched) {
      throw Parse.Error(Parse.Error.VALIDATION_ERROR, 'Invalid Password');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    existingUser.set('password', hashedPassword);

    await existingUser.save(null, { useMasterKey: true });

    return 'Password updated';
  } catch (error) {
    throw Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = editPassword;
