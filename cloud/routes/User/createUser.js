const createUser = async req => {
  try {
    const { firstName, lastName, userName, email, password, confirmPassword, profilePicture } =
      req.params;

    if (password !== confirmPassword) {
      throw new Parse.Error(422, 'Password and Confirm Password does not match');
    }

    const newACL = new Parse.ACL();
    const newUser = new Parse.User();

    /* User Profile Picture */
    const filePicture = { base64: profilePicture };
    const fileExtension = profilePicture.split(';')[0].split('/')[1];
    const fileName = `${userName}.${fileExtension}`;
    const savedProfilePicture = await new Parse.File(fileName, filePicture).save({
      useMasterKey: true,
    });

    newACL.setPublicReadAccess(false);
    newACL.setPublicWriteAccess(false);

    newUser.setACL(newACL);
    newUser.set('profile_picture', savedProfilePicture._url);
    newUser.set('first_name', firstName);
    newUser.set('last_name', lastName);
    newUser.set('username', userName);
    newUser.set('email', email);
    newUser.set('password', password);

    await newUser.signUp();

    return { message: 'Sign up success', type: 'success' };
  } catch (error) {
    let errorType = Parse.Error.INTERNAL_SERVER_ERROR;

    if (error.code === 422) {
      errorType = Parse.Error.VALIDATION_ERROR;
    }

    throw new Parse.Error(errorType, error.message);
  }
};

module.exports = createUser;
