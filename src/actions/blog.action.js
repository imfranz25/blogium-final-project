import * as api from '../api';
import { FETCH_ALL, CREATE } from '../constants/actionTypes.js';

const getBlogs = (navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await api.fetchBlogs(token);

    dispatch({ type: FETCH_ALL, payload: data.blogs });
  } catch (error) {
    if (error.response?.status === 403) {
      localStorage.clear();
      navigate('/login');
    } else if (error.response?.status === 500) {
      alert(error.response?.message);
    } else {
      alert(error.response?.data?.errors[0].msg);
    }
  }
};

const createBlog = (blogData, navigate) => async (dispatch) => {
  const blogFormData = new FormData();

  /* Append data -> newly created FormData */
  blogFormData.append('title', blogData.title);
  blogFormData.append('description', blogData.description);
  blogFormData.append('cover_picture_url', blogData.cover_picture_url);

  try {
    const token = localStorage.getItem('token');
    const { data } = await api.createBlog(blogFormData, token);

    alert(data.message);

    dispatch({ type: CREATE, payload: data.blog });
    navigate('/sds');
  } catch (error) {
    if (error.response?.status === 403) {
      console.log('Session Timeout');
      navigate('/login');
    } else if (error.response?.status === 500) {
      alert(error.response?.message);
    } else {
      alert(error.response?.data?.errors[0].msg);
    }
  }
};

export { getBlogs, createBlog };
