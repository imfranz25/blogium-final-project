import { AUTH, LOGOUT } from '../constants/actionTypes.js';
import jwtDecode from 'jwt-decode';

const reducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      /* Store token -> localstorage  */
      localStorage.setItem('token', action.payload);
      return { ...state, authData: jwtDecode(action.payload) };
    case LOGOUT:
      /* Clear localstorage  */
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default reducer;
