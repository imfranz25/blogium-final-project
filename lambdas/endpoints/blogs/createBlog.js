/* eslint-disable no-console */
const response = require('../../common/API_response');
const Dynamo = require('../../common/Dynamo');

/* Global variables */
const blogTableName = process.env.BLOG_TABLE_NAME;

exports.handler = async (event) => {
  try {
    console.log('event', event);
    const blog = JSON.parse(event.body);
    const newBlog = await Dynamo.write(blog, blogTableName);

    if (!newBlog) {
      return response.send(404, { message: 'Blog creation failed' });
    }

    return response.send(201, { blog: newBlog });
  } catch (error) {
    console.log(error);
    return response.send(500, { message: 'Internal Server Error' });
  }
};
