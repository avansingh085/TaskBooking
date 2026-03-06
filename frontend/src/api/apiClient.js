import axios from 'axios';
console.log('Backend endpoint:', import.meta.env.VITE_BACKEND_ENDPOINT);
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_ENDPOINT || 'http://localhost:5000/api',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

