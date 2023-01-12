/* eslint-disable no-console */
const response = require('../../common/API_response');
const AWS = require('aws-sdk');
const SES = new AWS.SES();

exports.handler = async (event) => {
  try {
    console.log('event', event);
    const { recipient, sender, subject, body } = JSON.parse(event.body);
    const params = {
      Destination: {
        ToAddress: [recipient],
      },
      Message: {
        Source: sender,
        Subject: { Data: subject },
        Body: {
          Text: { Data: body },
        },
      },
    };

    await SES.sendEmail(params).promise();

    return response.send(200, { message: 'Email sent' });
  } catch (error) {
    console.log(error);
    return response.send(500, { message: 'Internal Server Error' });
  }
};
