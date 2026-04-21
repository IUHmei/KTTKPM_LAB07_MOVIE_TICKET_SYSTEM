import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Tự động gắn token nếu có
api.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('movie_ticket_user') || 'null');

    if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
});

export default api;