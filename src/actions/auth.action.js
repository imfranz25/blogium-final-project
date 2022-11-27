import * as api from '../api';
import { AUTH, SUCCESS } from '../constants/actionTypes.js';
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
    const { data } = await api.signUpUser(userFormData);

    return { type: SUCCESS, message: data.message, status: 201 };
  } catch (error) {
    return errorHandler(error);
  }
};

const updatePassword = (userCredentials, navigate) => async (_dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await api.updatePassword(userCredentials, token);

    return { type: SUCCESS, message: data.message, status: 200 };
  } catch (error) {
    return errorHandler(error);
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

    localStorage.setItem('token', data.token);

    return { type: SUCCESS, message: data.message, status: 200 };
  } catch (error) {
    return errorHandler(error);
  }
};

const loginUser = (userCredentials, navigate) => async (dispatch) => {
  try {
    const { data } = await api.loginUser(userCredentials);

    dispatch({ type: AUTH, payload: data.token });

    return { type: SUCCESS, message: data.message, status: 200 };
  } catch (error) {
    return errorHandler(error);
  }
};

export { signUpUser, loginUser, updateUser, updatePassword };
