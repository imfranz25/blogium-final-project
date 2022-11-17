/* Models */
const User = require('../models');

exports.postSignUp = async (req, res, _next) => {
  try {
    const newUser = new User(req.body);

    await newUser.save();
    res.status(201).json({ message: 'Sign-up success', user: newUser });
  } catch (error) {
    console.log(error);
  }
};
