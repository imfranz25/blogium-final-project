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

const updatePassword = (userCredentials, navigate) => async (_dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await api.updatePassword(userCredentials, token);

    alert(data.message);
  } catch (error) {
    errorHandler(error, navigate);
  }
};

const updateUser = (userData, navigate) => async (_dispatch) => {
  const token = localStorage.getItem('token');
  let userFormData = new FormData();

  /* Append data -> newly created FormData */
  userFormData.append('first_name', userData.first_name);
  userFormData.append('last_name', userData.last_name);
  userFormData.append('email', userData.email);
  userFormData.append('username', userData.username);

  if (userData.profile_picture_url) {
    userFormData.append('profile_picture_url', userData.profile_picture_url);
  }

  try {
    const { data } = await api.updateUser(userFormData, token);

    alert(data.message);

    localStorage.setItem('token', data.token);
  } catch (error) {
    errorHandler(error, navigate);
  }
};

const loginUser = (userCredentials, navigate) => async (dispatch) => {
  try {
    const { data } = await api.loginUser(userCredentials);

    dispatch({ type: AUTH, payload: data.token });

    return { type: 'success', message: data.message, status: 200 };
  } catch (error) {
    return errorHandler(error, navigate);
  }
};

export { signUpUser, loginUser, updateUser, updatePassword };
