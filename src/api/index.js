import axios from 'axios';

const URL = 'http://localhost:8080';

// Post API Endpoints
export const fetchBlogs = () => axios.get(`${URL}/blog`);
