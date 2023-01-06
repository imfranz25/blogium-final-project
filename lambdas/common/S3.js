/* 3rd Party Modules */
const AWS = require('aws-sdk');

/* Constructors & Initialization */
const s3Client = new AWS.S3();

const S3 = {
  async get() {
    return true;
  },
  async write(data, fileName, bucketName) {
    const params = {
      Bucket: bucketName,
      Body: JSON.stringify(data),
      Key: fileName,
      ACL: 'public-read',
    };

    const newData = await s3Client.putObject(params).promise();

    if (!newData) {
      throw new Error(`Error upload on bucket: ${bucketName}`);
    }

    return {
      data: newData,
      url: `https://${bucketName}.s3.amazonaws.com/${fileName}`,
    };
  },
};

module.exports = S3;
