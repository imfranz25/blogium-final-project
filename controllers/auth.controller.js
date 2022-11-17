/* 3rd Party Module(s) */
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

/* Models & Helpers */
const { User } = require('../models');
const { hashGen } = require('../helpers');

/**
 * Create a new user
 * @route POST /signup
 */
exports.postSignUp = async (req, res, _next) => {
  const { password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const id = uuidv4();
    const hashedPassword = hashGen.generateHash(id, password);
    const newUser = new User({ ...req.body, id: id, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: 'Sign-up success', user: newUser });
  } catch (error) {
    console.log(error);
  }
};
