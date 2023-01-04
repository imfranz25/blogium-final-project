/* 3rd Party Modules */
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');

/* Constructors & Initialization */
const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
  async get(ID, TableName) {
    const params = { TableName, Key: { ID } };
    const data = await documentClient.get(params).promise();

    if (!data || !data.Item) {
      throw new Error(`An error occurred from ${TableName} with ID: ${ID}`);
    }

    // eslint-disable-next-line no-console
    console.log(data);

    return data.Item;
  },
  async write(fields, TableName) {
    const data = { ...fields, ID: uuidv4() };
    const params = {
      TableName,
      Item: data,
    };
    const response = await documentClient.put(params, TableName).promise();

    if (!response) {
      throw new Error(`An error occurred from ${TableName} with ID: ${data.ID}`);
    }

    return data;
  },
};

module.exports = Dynamo;
