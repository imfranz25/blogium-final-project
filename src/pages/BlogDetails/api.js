import Parse from 'parse';

export const getBlog = async (blogId) => {
  try {
    const params = { blogId };
    const result = await Parse.Cloud.run('getBlog', params);

    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default getBlog;
