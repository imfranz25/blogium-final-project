import Parse from 'parse';

export const loginUser = async (userData) => {
  try {
    const params = { ...userData };
    const result = await Parse.Cloud.run('loginUser', params);

    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const registerSession = async (session) => {
  Parse.User.enableUnsafeCurrentUser();
  Parse.User.become(session, { useMasterKey: false });
};
