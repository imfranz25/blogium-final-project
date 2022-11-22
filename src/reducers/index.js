import { combineReducers } from 'redux';

import authReducer from './auth.reducer';
import blogReducer from './blogs.reducer';

export default combineReducers({
  authReducer,
  blogReducer,
});
