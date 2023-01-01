import { combineReducers } from 'redux';
import blogReducer from './blogReducer';
import searchReducer from './searchReducer';

export default combineReducers({
  blogReducer,
  searchReducer,
});
