import * as api from '../api';
import { FETCH_ALL } from '../constants/actionTypes.js';

const getBlogs = (navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await api.fetchBlogs(token);

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    alert(error.response?.data?.message);
    localStorage.clear();
    navigate('/login');
  }
};

export { getBlogs };
