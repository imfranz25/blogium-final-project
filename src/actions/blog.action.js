import * as api from '../api';
import { FETCH_ALL, CREATE } from '../constants/actionTypes.js';

const getBlogs = (navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await api.fetchBlogs(token);
    console.log(data);

    dispatch({ type: FETCH_ALL, payload: data.blogs });
  } catch (error) {
    console.log(error);
    localStorage.clear();
    navigate('/login');
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
    navigate('/');
  } catch (error) {
    console.log(error);
    localStorage.clear();
    navigate('/login');
  }
};

export { getBlogs, createBlog };
