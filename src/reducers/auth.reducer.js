import { AUTH } from '../constants/actionTypes.js';
import jwtDecode from 'jwt-decode';

const reducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      /* Store  */
      localStorage.setItem('token', action.payload);
      return { ...state, authData: jwtDecode(action.payload) };
    default:
      return state;
  }
};

export default reducer;
