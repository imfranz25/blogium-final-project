import Parse from 'parse';

const createBlog = async (blogData) => {
  try {
    const params = { ...blogData };
    const result = await Parse.Cloud.run('createBlog', params);

    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default createBlog;
