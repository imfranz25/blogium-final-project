const getBlog = async req => {
  if (!req.user) {
    throw new Parse.Error(Parse.Error.INVALID_SESSION_TOKEN, 'Invalid session token');
  }

  try {
    const { blogId } = req.params;
    const blogQuery = await new Parse.Query('blogs')
      .include('user')
      .equalTo('objectId', blogId)
      .first();

    if (!blogQuery) {
      throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'Blog does not exist');
    }

    const user = blogQuery.get('user');
    const blog = {
      id: blogId,
      title: blogQuery.get('title'),
      description: blogQuery.get('description'),
      blogCover: blogQuery.get('blog_cover'),
      createAt: blogQuery.get('createAt'),
      owner: {
        userName: user.get('username'),
        profilePicture: user.get('profile_picture'),
        firstName: user.get('first_name'),
      },
    };

    return { blog: blog, type: 'success' };
  } catch (error) {
    throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = getBlog;
