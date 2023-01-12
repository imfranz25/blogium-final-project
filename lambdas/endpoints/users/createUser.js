/* eslint-disable no-console */
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const response = require('../../common/API_response');
const Dynamo = require('../../common/Dynamo');
const S3 = require('../../common/S3');

/* Global variables */
const userTableName = process.env.USER_TABLE_NAME;
const userBucket = process.env.USER_BUCKET;

exports.handler = async (event) => {
  try {
    console.log('event', event);
    const userId = uuidv4();
    const { profilePicture, firstName, lastName, email, userName, password } = event.body;

    const profileUpload = await S3.write(profilePicture, `${userName}_${userId}`, userBucket);

    if (!profileUpload?.url) {
      return response.send(500, { message: 'User creation failed' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = JSON.parse({
      userId,
      profilePicture: profileUpload.url,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const newUser = await Dynamo.write(user, userTableName);

    if (!newUser) {
      return response.send(500, { message: 'Blog creation failed' });
    }

    return response.send(201, { user: newUser });
  } catch (error) {
    console.log(error);
    return response.send(500, { message: 'Internal Server Error' });
  }
};
