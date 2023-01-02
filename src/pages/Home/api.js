import Parse from 'parse';

const getBlogs = async () => {
  try {
    const result = await Parse.Cloud.run('getBlogs');

    return Promise.resolve(result);
  } catch (error) {
    return Promise.resolve(error);
  }
};

export default getBlogs;
