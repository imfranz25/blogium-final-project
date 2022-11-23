import * as api from '../api';
import { AUTH } from '../constants/actionTypes.js';

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
    if (error.response.status === 422) {
      alert(error.response?.data?.errors[0].msg);
    } else {
      alert(error.response?.data?.message);
    }
  }
};

const loginUser = (userCredentials, navigate) => async (dispatch) => {
  try {
    const { data } = await api.loginUser(userCredentials);

    dispatch({ type: AUTH, payload: data.token });
    navigate('/');
  } catch (error) {
    if (error.response.status === 422) {
      alert(error.response?.data?.errors[0].msg);
    } else {
      alert(error.response?.data?.message);
    }
  }
};

export { signUpUser, loginUser };
