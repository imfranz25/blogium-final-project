const loginUser = async req => {
  try {
    const { email, password } = req.params;
    const user = await Parse.User.logIn(email, password);

    return {
      email: email,
      username: user.getUsername(),
      firstName: user.get('first_name'),
      lastName: user.get('last_name'),
      profilePicture: user.get('profile_picture'),
      sessionToken: user.getSessionToken(),
    };
  } catch (error) {
    console.log(error);
    throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'Invalid email or password');
  }
};

module.exports = loginUser;
