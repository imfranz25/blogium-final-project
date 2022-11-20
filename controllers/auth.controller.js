/* 3rd Party Module(s) */
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

/* Models & Helpers */
const { User } = require('../models');
const { passGen, tokenGenerator } = require('../helpers');

/**
 * Create a new user
 * @route POST /signup
 */
exports.postSignUp = async (req, res, next) => {
  const { password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ message: 'Invalid Input', errors: errors.array() });
  }

  try {
    const id = uuidv4();
    const hashedPassword = passGen.generateHash(id, password);
    const newUser = new User({ ...req.body, id, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: 'Sign-up success', user: newUser });
  } catch (error) {
    next(error);
  }
};

/**
 * Check email and password
 * generate jwt token for valid email & password
 * @route POST /login
 */
exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // prettier-ignore
    const isPasswordMatched = passGen.compareHash(
      existingUser.id, 
      password, 
      existingUser.password
    );

    if (!isPasswordMatched) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = tokenGenerator({
      userId: existingUser.id,
      email: existingUser.email,
      username: existingUser.username,
      image: existingUser.profile_picture_url,
      first_name: existingUser.first_name,
      last_name: existingUser.last_name,
    });

    res.status(200).json({ message: 'Login success', token });
  } catch (error) {
    next(error);
  }
};
