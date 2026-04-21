const USER_KEY = 'movie_ticket_user';

export const saveUserToStorage = (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUserFromStorage = () => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
};

export const removeUserFromStorage = () => {
    localStorage.removeItem(USER_KEY);
};