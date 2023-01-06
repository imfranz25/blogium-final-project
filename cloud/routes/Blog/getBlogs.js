const getBlogs = async req => {
  if (!req.user) {
    throw new Parse.Error(Parse.Error.INVALID_SESSION_TOKEN, 'Invalid session token');
  }

  try {
    const fetchBlogs = [];
    /* prettier-ignore */
    const blogs = await new Parse.Query('blogs')
      .descending('createdAt')
      .include('user')
      .find();

    for (const blog of blogs) {
      const user = blog.get('user');

      fetchBlogs.push({
        id: blog.id,
        title: blog.get('title'),
        description: blog.get('description'),
        blogCover: blog.get('blog_cover'),
        createAt: blog.get('createAt'),
        owner: {
          userName: user.get('username'),
          profilePicture: user.get('profile_picture'),
        },
      });
    }

    return { blogs: fetchBlogs, type: 'success' };
  } catch (error) {
    throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = getBlogs;
