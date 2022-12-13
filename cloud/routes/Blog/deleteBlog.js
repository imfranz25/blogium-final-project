const deleteBlog = async req => {
  if (!req.user) {
    throw new Parse.Error(Parse.Error.INVALID_SESSION_TOKEN, 'Invalid session token');
  }

  try {
    const { blogId } = req.params;
    const blog = new Parse.Object.extend('blogs');
    const existingBlog = new Parse.Query(blog).equalTo('objectId', blogId);

    if (!existingBlog) {
      throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'Blog does not exist');
    }

    existingBlog.set('deleted_At', new Date().toISOString());

    await existingBlog.save();

    return 'Blog deleted';
  } catch (error) {
    throw Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = deleteBlog;
