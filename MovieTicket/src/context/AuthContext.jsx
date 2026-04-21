import { createContext, useContext, useMemo, useState } from 'react';
import { login as loginApi, register as registerApi } from '../services/authService';
import {
    getUserFromStorage,
    removeUserFromStorage,
    saveUserToStorage,
} from '../utils/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(getUserFromStorage());
    const [loading, setLoading] = useState(false);

    const login = async (formData) => {
        setLoading(true);
        try {
            const data = await loginApi(formData);
            setUser(data);
            saveUserToStorage(data);
            return { success: true, data };
        } catch (error) {
            return {
                success: false,
                message: error?.response?.data?.message || 'Đăng nhập thất bại',
            };
        } finally {
            setLoading(false);
        }
    };

    const register = async (formData) => {
        setLoading(true);
        try {
            const data = await registerApi(formData);
            return { success: true, data };
        } catch (error) {
            return {
                success: false,
                message: error?.response?.data?.message || 'Đăng ký thất bại',
            };
        } finally {
            setLoading(false);
        }
    };
    const logout = () => {
        setUser(null);
        removeUserFromStorage();
    };

    const value = useMemo(
        () => ({
            user,
            loading,
            login,
            register,
            logout,
            isAuthenticated: !!user,
        }),
        [user, loading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}