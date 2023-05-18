import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});


api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('user');
        console.log(accessToken)
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken.replace(/['"]+/g, '')}`;
        }

        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

export default api;
