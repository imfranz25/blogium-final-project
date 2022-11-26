import { SEARCH, CLEAR } from '../constants/actionTypes.js';

const reducer = (blogs = [], action) => {
  switch (action.type) {
    case SEARCH:
      if (action.searchQuery.trim()) {
        return action.payload.filter((blog) => blog.title.includes(action.searchQuery));
      }

      return [];
    case CLEAR:
      return action.payload;
    default:
      return blogs;
  }
};

export default reducer;
