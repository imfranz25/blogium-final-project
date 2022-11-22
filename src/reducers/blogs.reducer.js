import { FETCH_ALL } from '../constants/actionTypes.js';

const reducer = (blogs = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    default:
      return blogs;
  }
};

export default reducer;
