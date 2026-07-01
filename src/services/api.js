// A simple way to manage this in a file like 'src/api/axiosConfig.js'
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://advt-backend-xuoo.onrender.com', // Use your confirmed URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;