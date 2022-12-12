const bycrypt = require('bycrypt');

const createUser = async req => {
  const { password } = req.params;

  try {
    const hashedPassword = await bycrypt.hash(password, 12);
    console.log(hashedPassword);
  } catch (error) {
    console.log(error);
  }
};

module.exports = createUser;
