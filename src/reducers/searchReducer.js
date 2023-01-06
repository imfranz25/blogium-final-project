import { SEARCH } from '../constants/actionTypes.js';

const reducer = (blogs = [], action) => {
  switch (action.type) {
    case SEARCH:
      return [action.payload];
    default:
      return blogs;
  }
};

export default reducer;
