import { FETCH_ALL, CREATE, FETCH_MY_BLOG, FETCH } from '../constants/actionTypes.js';

const reducer = (blogs = [], action) => {
  switch (action.type) {
    case FETCH:
      return [action.payload];
    case FETCH_ALL:
      return action.payload;
    case FETCH_MY_BLOG:
      return action.payload;
    case CREATE:
      return [...blogs, action.payload];
    default:
      return blogs;
  }
};

export default reducer;
