const parseValidationError = msg => {
  return Parse.Error(Parse.Error.VALIDATION_ERROR, msg);
};

module.exports = parseValidationError;
