/* 3rd Party Modules */
const AWS = require('aws-sdk');

/* Constructors & Initialization */
const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
  async get(ID, TableName) {
    const params = { TableName, Key: { ID } };
    const data = await documentClient.get(params).promise();

    if (!data || !data.Item) {
      throw new Error(`An error occured from ${TableName} with ID: ${ID}`);
    }

    // eslint-disable-next-line no-console
    console.log(data);

    return data.Item;
  },
};

module.exports = Dynamo;
