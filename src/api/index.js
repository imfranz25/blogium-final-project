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

export const createBlog = (blogData, token) =>
  axios({
    method: 'post',
    url: `${API}/blog/add`,
    data: blogData,
    headers: {
      Authorization: token,
    },
  });
