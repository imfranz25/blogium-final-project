import { FETCH_ALL, CREATE, FETCH, DELETE, FETCH_MY_BLOG } from '../constants/actionTypes.js';

const reducer = (blogs = [], action) => {
  switch (action.type) {
    case FETCH:
      return [action.payload];
    case FETCH_ALL:
    case FETCH_MY_BLOG:
      return action.payload;
    case CREATE:
      return [...blogs, action.payload];
    case DELETE:
      return blogs.map((blog) => {
        if (blog.id === action.payload.id) {
          return action.payload;
        }

        return blog;
      });
    default:
      return blogs;
  }
};

export default reducer;
