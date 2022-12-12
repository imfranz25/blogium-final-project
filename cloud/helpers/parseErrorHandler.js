const parseValidationError = msg => {
  return new Parse.Error(Parse.Error.VALIDATION_ERROR, msg);
};

module.exports = parseValidationError;
