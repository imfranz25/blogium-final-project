import axios from 'axios';

/* Back-end API URL */
const API = process.env.REACT_APP_BACKEND_URL;

/* Auth */
export const loginUser = (userCredentials) => axios.post(`${API}/login`, userCredentials);
export const signUpUser = (userData) =>
  axios({
    method: 'post',
    url: `${API}/signup`,
    data: userData,
  });

/* Blogs */
export const fetchBlogs = (token) =>
  axios({
    method: 'get',
    url: `${API}/blog`,
    headers: {
      Authorization: token,
    },
  });

/* Own Blogs of the user */
export const fetchMyBlogs = (token) =>
  axios({
    method: 'get',
    url: `${API}/myblog`,
    headers: {
      Authorization: token,
    },
  });

export const fetchBlog = (blogId, token) =>
  axios({
    method: 'get',
    url: `${API}/${blogId}`,
    headers: {
      Authorization: token,
    },
  });

export const createBlog = (blogData, token) =>
  axios({
    method: 'post',
    url: `${API}/blog/add`,
    data: blogData,
    headers: {
      Authorization: token,
    },
  });

export const draftBlog = (blogData, token) =>
  axios({
    method: 'post',
    url: `${API}/blog/draft`,
    data: blogData,
    headers: {
      Authorization: token,
    },
  });
