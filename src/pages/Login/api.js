import Parse from 'parse';

export const loginUser = async (userData) => {
  try {
    const params = { ...userData };
    let currentUser = Parse.User.current();

    if (currentUser) {
      Parse.User.logOut();
    }

    const result = await Parse.Cloud.run('loginUser', params);

    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default loginUser;
