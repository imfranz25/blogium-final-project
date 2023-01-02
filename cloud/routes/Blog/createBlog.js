const createBlog = async req => {
  if (!req.user) {
    throw new Parse.Error(Parse.Error.INVALID_SESSION_TOKEN, 'Invalid session token');
  }

  try {
    const { blogCover, title, description } = req.params;
    const Blog = Parse.Object.extend('blogs');
    const newBlog = new Blog();
    const newACL = new Parse.ACL();

    /* File upload */
    const blogCover64 = { base64: blogCover };
    const fileExtension = blogCover.split(';')[0].split('/')[1];
    const fileName = `${title}.${fileExtension}`;
    const savedBlogCover = await new Parse.File(fileName, blogCover64).save({
      useMasterKey: true,
    });

    newACL.setPublicReadAccess(true);
    newACL.setPublicWriteAccess(false);
    newACL.setWriteAccess(req.user, true);

    newBlog.setACL(newACL);
    newBlog.set('user', req.user);
    newBlog.set('blog_cover', savedBlogCover._url);
    newBlog.set('title', title);
    newBlog.set('description', description);
    newBlog.set('deleted_At', null);

    await newBlog.save(null, { useMasterKey: true });

    return { message: 'Blog created', type: 'success' };
  } catch (error) {
    throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = createBlog;
