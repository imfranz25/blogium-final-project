/* eslint-disable no-console */
const { v4: uuidv4 } = require('uuid');
const response = require('../../common/API_response');
const Dynamo = require('../../common/Dynamo');
const S3 = require('../../common/S3');

/* Global variables */
const blogTableName = process.env.BLOG_TABLE_NAME;
const blogBucket = process.env.BLOG_BUCKET;

exports.handler = async (event) => {
  try {
    console.log('event', event);
    const blogId = uuidv4();
    const { title, description, blogCover } = event.body;
    const blogUpload = await S3.write(blogCover, `${title}_${blogId}`, blogBucket);

    if (!blogUpload?.url) {
      return response.send(500, { message: 'Blog creation failed' });
    }

    const blog = JSON.parse({
      ID: blogId,
      title,
      description,
      blogCover: blogUpload?.url,
    });
    const newBlog = await Dynamo.write(blog, blogTableName);

    if (!newBlog) {
      return response.send(500, { message: 'Blog creation failed' });
    }

    return response.send(201, { blog: newBlog });
  } catch (error) {
    console.log(error);
    return response.send(500, { message: 'Internal Server Error' });
  }
};
