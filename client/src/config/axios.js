import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// Add a request interceptor
instance.interceptors.request.use(
    async (config) => {
        // Any request configuration
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 405) {
            console.error('Method not allowed error. Please check API configuration.');
        }
        return Promise.reject(error);
    }
);

export default instance;