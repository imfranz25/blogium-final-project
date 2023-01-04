const { HEADERS } = require('../constants');

const response = {
  send: (statusCode, data) => ({
    headers: HEADERS,
    statusCode,
    body: JSON.stringify(data),
  }),
};

module.exports = response;
