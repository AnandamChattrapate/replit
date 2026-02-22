// import axios from 'axios'
// const API=axios.create({
//     baseURL:"http://localhost:3000/api",
//     withCredentials:true,
//  })
// export default API;
import axios from 'axios';

// Get the base URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/';

console.log('API URL:', API_URL); // This will help debugging

const API = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for debugging
API.interceptors.request.use(
  (config) => {
    console.log(`📤 ${config.method.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
