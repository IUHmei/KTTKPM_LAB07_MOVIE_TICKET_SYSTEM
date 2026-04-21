import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';
import BookingPage from '../pages/BookingPage';
import BookingsPage from '../pages/BookingsPage';
import LoginPage from '../pages/LoginPage';
import MoviesPage from '../pages/MoviesPage';
import RegisterPage from '../pages/RegisterPage';

function AppRoutes() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="/movies" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route
                    path="/movies"
                    element={
                        <ProtectedRoute>
                            <MoviesPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/booking/:movieId"
                    element={
                        <ProtectedRoute>
                            <BookingPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/bookings"
                    element={
                        <ProtectedRoute>
                            <BookingsPage />
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<Navigate to="/movies" replace />} />
            </Routes>
        </>
    );
}

export default AppRoutes;