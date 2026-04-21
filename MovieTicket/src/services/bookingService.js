import api from './api';

export const createBooking = async (payload) => {
    const response = await api.post('/bookings', payload);
    return response.data;
};

export const getBookings = async (userId) => {
    const response = await api.get('/bookings', {
        params: userId ? { userId } : {},
    });
    return response.data;
};