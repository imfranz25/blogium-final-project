import * as api from '../api';
import { FETCH_ALL } from '../constants/actionTypes.js';

const getBlogs = (navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await api.fetchBlogs(token);

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    if (error.response.status === 401) {
      navigate('/login');
    } else {
      alert(error.response?.data?.message);
    }
  }
};

export { getBlogs };
