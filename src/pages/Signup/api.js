import Parse from 'parse';

export const createUser = async (userData) => {
  try {
    const params = { ...userData };
    let currentUser = Parse.User.current();

    if (currentUser) {
      Parse.User.logOut();
    }

    const result = await Parse.Cloud.run('createUser', params, {
      useMasterKey: true,
    });

    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default createUser;
