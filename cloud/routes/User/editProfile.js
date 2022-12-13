const editProfile = async req => {
  try {
    const { firstName, lastName, userName, email, userId } = req.params;

    /* prettier-ignore */
    const existingUser = await new Parse.Query(Parse.User)
      .equalTo('objectId', userId)
      .first();

    if (!existingUser) {
      throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'User does not exist');
    }

    /* Edit profile details */
    existingUser.set('first_name', firstName);
    existingUser.set('last_name', lastName);
    existingUser.set('username', userName);
    existingUser.set('email', email);

    await existingUser.save(null, { useMasterKey: true });

    return 'User updated';
  } catch (error) {
    throw Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = editProfile;
