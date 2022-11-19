/* 3rd Party Module(s) */
const { generateUsername } = require('unique-username-generator');

/**
 * Valid User Data Inputs
 */
const userName = generateUsername('', 0, 15);
const userEmail = `${userName}@gmail.com`;
const userInput = {
  first_name: 'Francis',
  last_name: 'Ong',
  email: userEmail,
  username: userName,
  password: 'Stratpoint123!',
  confirm_password: 'Stratpoint123!',
  profile_picture_url: 'sample.png',
};

module.exports = {
  userInput,
};
