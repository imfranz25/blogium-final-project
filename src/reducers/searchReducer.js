import { FETCH } from '../constants/actionTypes.js';

const reducer = (blogs = [], action) => {
  switch (action.type) {
    case FETCH:
      return [action.payload];
    default:
      return blogs;
  }
};

export default reducer;
