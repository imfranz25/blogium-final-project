import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL;

// Post API Endpoints
export const fetchBlogs = () => axios.get(`${API}/blog`);
