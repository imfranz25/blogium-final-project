import * as api from '../api';
import { AUTH } from '../constants/actionTypes.js';
import errorHandler from '../utils/errorHandler';

const signUpUser = (userData, navigate) => async (_dispatch) => {
  let userFormData = new FormData();

  /* Append data -> newly created FormData */
  userFormData.append('first_name', userData.first_name);
  userFormData.append('last_name', userData.last_name);
  userFormData.append('email', userData.email);
  userFormData.append('username', userData.username);
  userFormData.append('password', userData.password);
  userFormData.append('confirm_password', userData.confirm_password);
  userFormData.append('profile_picture_url', userData.profile_picture_url);

  try {
    await api.signUpUser(userFormData);

    navigate('/login');
  } catch (error) {
    errorHandler(error, navigate);
  }
};

const loginUser = (userCredentials, navigate) => async (dispatch) => {
  try {
    const { data } = await api.loginUser(userCredentials);

    dispatch({ type: AUTH, payload: data.token });
    navigate('/');
  } catch (error) {
    errorHandler(error, navigate);
  }
};

export { signUpUser, loginUser };
