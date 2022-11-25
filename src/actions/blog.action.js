import * as api from '../api';
import { FETCH_ALL, CREATE, FETCH, DELETE, FETCH_MY_BLOG } from '../constants/actionTypes.js';
import errorHandler from '../utils/errorHandler';

const getBlogs = (navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await api.fetchBlogs(token);

    dispatch({ type: FETCH_ALL, payload: data.blogs });
  } catch (error) {
    errorHandler(error, navigate);
  }
};

const getMyBlogs = (navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await api.fetchMyBlogs(token);

    dispatch({ type: FETCH_MY_BLOG, payload: data.blogs });
  } catch (error) {
    errorHandler(error, navigate);
  }
};

const getBlog = (blogId, navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await api.fetchBlog(blogId, token);

    dispatch({ type: FETCH, payload: data.blog });
  } catch (error) {
    errorHandler(error, navigate);
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
    errorHandler(error, navigate);
  }
};

const updateBlog = (blogData, navigate) => async (dispatch) => {
  const blogFormData = new FormData();

  /* Append data -> newly created FormData */
  blogFormData.append('title', blogData.title);
  blogFormData.append('description', blogData.description);
  blogFormData.append('cover_picture_url', blogData.cover_picture_url);

  try {
    const token = localStorage.getItem('token');
    const { data } = await api.updateBlog(blogData.id, blogFormData, token);

    alert(data.message);

    navigate('/dashboard/blog');
  } catch (error) {
    errorHandler(error, navigate);
  }
};

const deleteBlog = (blogId, navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await api.deleteBlog(blogId, token);

    alert(data.message);

    // navigate('/dashboard/blog')
    dispatch({ type: DELETE, payload: data.blog });
  } catch (error) {
    errorHandler(error, navigate);
  }
};

const draftBlog = (blogData, navigate) => async (_dispatch) => {
  const blogFormData = new FormData();

  /* Append data -> newly created FormData */
  blogFormData.append('title', blogData.title);
  blogFormData.append('description', blogData.description);
  blogFormData.append('cover_picture_url', blogData.cover_picture_url);

  try {
    const token = localStorage.getItem('token');
    const { data } = await api.draftBlog(blogFormData, token);

    alert(data.message);

    navigate('/dashboard/blog');
  } catch (error) {
    errorHandler(error, navigate);
  }
};

export { getBlogs, createBlog, draftBlog, getMyBlogs, getBlog, deleteBlog, updateBlog };
