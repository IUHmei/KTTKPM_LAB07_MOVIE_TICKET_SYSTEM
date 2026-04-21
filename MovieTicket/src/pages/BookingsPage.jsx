import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import StatusBadge from '../components/StatusBadge';
import { useAuth } from '../context/AuthContext';
import { getBookings } from '../services/bookingService';
import { getMovies } from '../services/movieService';

function BookingsPage() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError('');

        try {
            const [bookingData, movieData] = await Promise.all([
                getBookings(user?.id),
                getMovies(),
            ]);
            setBookings(Array.isArray(bookingData) ? bookingData : []);
            setMovies(Array.isArray(movieData) ? movieData : []);
        } catch (err) {
            setError(err?.response?.data?.message || 'Không tải được danh sách booking');
        } finally {
            setLoading(false);
        }
    };

    const getMovieTitle = (movieId) => {
        const movie = movies.find((item) => String(item.id) === String(movieId));
        return movie?.title || `Movie ID: ${movieId}`;
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h2>Danh sách booking của tôi</h2>
                <button className="btn btn-secondary" onClick={fetchData}>
                    Refresh trạng thái
                </button>
            </div>

            {loading && <Loader text="Đang tải danh sách booking..." />}
            {error && <div className="alert alert-error">{error}</div>}

            {!loading && !error && (
                <div className="table-wrapper">
                    <table className="booking-table">
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Movie</th>
                                <th>Seat</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length > 0 ? (
                                bookings.map((booking) => (
                                    <tr key={booking.id}>
                                        <td>{booking.id}</td>
                                        <td>{getMovieTitle(booking.movieId)}</td>
                                        <td>{booking.seatNumber}</td>
                                        <td>
                                            <StatusBadge status={booking.status} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="empty-cell">
                                        Chưa có booking nào.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default BookingsPage;