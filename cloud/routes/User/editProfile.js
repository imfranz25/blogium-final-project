const editUser = async req => {
  const { first_name, last_name, username, email, userId } = req.params;

  /* prettier-ignore */
  const existingUser = await new Parse.Query(Parse.User)
    .equalTo('objectId', userId)
    .first();

  if (!existingUser) {
    throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'User does not exist');
  }

  /* Edit profile details */
  existingUser.set('first_name', first_name);
  existingUser.set('last_name', last_name);
  existingUser.set('username', username);
  existingUser.set('email', email);

  await existingUser.save(null, { useMasterKey: true });

  return 'User updated';
};

module.exports = editUser;
