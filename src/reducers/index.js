import { combineReducers } from 'redux';

import authReducer from './auth.reducer';
import blogReducer from './blogs.reducer';
import searchReducer from './search.reducer';

export default combineReducers({
  authReducer,
  blogReducer,
  searchReducer,
});
