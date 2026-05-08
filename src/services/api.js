import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://lms-backend-5-uzbi.onrender.com/api',
});

// Add a request interceptor to include the JWT token
API.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
