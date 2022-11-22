import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL;

/* Post API Endpoints */

/* Auth */
export const loginUser = (userCredentials) => axios.post(`${API}/login`, userCredentials);
export const signUpUser = (userData) =>
  axios({
    method: 'post',
    url: `${API}/signup`,
    data: userData,
  });

/* Blogs */
export const fetchBlogs = () => axios.get(`${API}/blog`);
