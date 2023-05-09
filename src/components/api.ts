import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});


api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

export default api;
