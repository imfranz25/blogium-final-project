/* eslint-disable no-console */
const response = require('../common/API_response');

exports.handler = async (event) => {
  console.log(event);

  return response.send(200);
};
