import * as api from '../api';
import errorHandler from '../utils/errorHandler';
import {
  FETCH_ALL,
  CREATE,
  FETCH,
  DELETE,
  FETCH_MY_BLOG,
  SEARCH,
  SUCCESS,
} from '../constants/actionTypes.js';

const getBlogs = (navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await api.fetchBlogs(token);

    dispatch({ type: FETCH_ALL, payload: data.blogs });
  } catch (error) {
    return errorHandler(error);
  }
};

const getMyBlogs = (navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await api.fetchMyBlogs(token);

    dispatch({ type: FETCH_MY_BLOG, payload: data.blogs });
  } catch (error) {
    return errorHandler(error);
  }
};

const getBlog = (blogId, navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await api.fetchBlog(blogId, token);

    dispatch({ type: FETCH, payload: data.blog });
  } catch (error) {
    return errorHandler(error);
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

    dispatch({ type: CREATE, payload: data.blog });

    return { type: SUCCESS, message: data.message, status: 201 };
  } catch (error) {
    return errorHandler(error);
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

    return { type: SUCCESS, message: data.message, status: 200 };
  } catch (error) {
    return errorHandler(error);
  }
};

const deleteBlog = (blogId, navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await api.deleteBlog(blogId, token);

    // navigate('/dashboard/blog')
    dispatch({ type: DELETE, payload: data.blog });

    return { type: SUCCESS, status: 200, message: data.message };
  } catch (error) {
    return errorHandler(error);
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

    return { type: SUCCESS, status: 200, message: data.message };
  } catch (error) {
    return errorHandler(error);
  }
};

const searchBlog = (searchQuery, navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await api.fetchBlogs(token);

    dispatch({ type: SEARCH, payload: data.blogs, searchQuery });
  } catch (error) {
    return errorHandler(error);
  }
};

export { getBlogs, createBlog, draftBlog, getMyBlogs, getBlog, deleteBlog, updateBlog, searchBlog };
