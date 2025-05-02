import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Backend server port
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include the session token
api.interceptors.request.use(async (config) => {
    if (typeof window !== 'undefined' && window.Clerk) {
        const session = await window.Clerk.session;
        if (session) {
            const token = await session.getToken();
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api; 