/* eslint-disable no-console */
const response = require('../../common/API_response');
const Dynamo = require('../../common/Dynamo');

/* Global variables */
const blogTableName = process.env.BLOG_TABLE_NAME;

exports.handler = async (event) => {
  try {
    console.log('event', event);
    const blogId = event?.pathParameters?.blogId;

    if (!blogId) {
      return response.send(400, { message: 'Blog ID is missing' });
    }

    const blog = await Dynamo.get(blogId, blogTableName);

    if (!blog) {
      return response.send(404, { message: 'Blog not found' });
    }

    return response.send(200, { blog });
  } catch (error) {
    console.log(error);
    return response.send(500, { message: 'Internal Server Error' });
  }
};
