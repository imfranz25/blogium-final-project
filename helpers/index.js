const passGen = require('./password.handler');
const tokenGenerator = require('./token.generator');
const multerUpload = require('./file-upload');

module.exports = {
  passGen,
  tokenGenerator,
  multerUpload,
};
