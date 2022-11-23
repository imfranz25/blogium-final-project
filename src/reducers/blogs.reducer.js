import { FETCH_ALL, CREATE } from '../constants/actionTypes.js';

const reducer = (blogs = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...blogs, action.payload];
    default:
      return blogs;
  }
};

export default reducer;
