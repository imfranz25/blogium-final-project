import { AUTH } from '../constants/actionTypes.js';

const reducer = (userData = null, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload?.token }));
      return action.payload;
    default:
      return userData;
  }
};

export default reducer;
