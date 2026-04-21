import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createBooking } from '../services/bookingService';
import { getMovies } from '../services/movieService';
import StatusBadge from '../components/StatusBadge';

function BookingPage() {
    const { movieId } = useParams();
    const { user } = useAuth();

    const [movies, setMovies] = useState([]);
    const [loadingMovies, setLoadingMovies] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successBooking, setSuccessBooking] = useState(null);

    const [formData, setFormData] = useState({
        userId: user?.id || '',
        movieId: movieId || '',
        seatNumber: '',
    });
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await getMovies();
                setMovies(Array.isArray(data) ? data : []);
            } catch {
                setMovies([]);
            } finally {
                setLoadingMovies(false);
            }
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            userId: user?.id || '',
            movieId: movieId || prev.movieId,
        }));
    }, [movieId, user]);

    const selectedMovie = movies.find((m) => String(m.id) === String(formData.movieId));

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessBooking(null);
        setSubmitting(true);

        try {
            const payload = {
                userId: Number(formData.userId),
                movieId: Number(formData.movieId),
                seatNumber: formData.seatNumber,
            };

            const data = await createBooking(payload);
            setSuccessBooking(data);
            setFormData((prev) => ({ ...prev, seatNumber: '' }));
        } catch (err) {
            setError(err?.response?.data?.message || 'Tạo booking thất bại');
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <div className="page-container booking-layout">
            <div className="form-card wide-card">
                <h2>Đặt vé</h2>

                {error && <div className="alert alert-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>User ID</label>
                        <input type="text" value={formData.userId} disabled />
                    </div>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" value={user?.username || ''} disabled />
                    </div>

                    <div className="form-group">
                        <label>Movie</label>
                        <select
                            name="movieId"
                            value={formData.movieId}
                            onChange={handleChange}
                            required
                            disabled={loadingMovies}
                        ></select>
                        <option value="">-- Chọn phim --</option>
                        {movies.map((movie) => (
                            <option key={movie.id} value={movie.id}>
                                {movie.title} (ID: {movie.id})
                            </option>
                        ))}
                    </div>


                    <div className="form-group">
                        <label>Seat Number</label>
                        <input
                            type="text"
                            name="seatNumber"
                            value={formData.seatNumber}
                            onChange={handleChange}
                            placeholder="Ví dụ: A5"
                            required
                        />
                    </div>

                    <button className="btn btn-primary full-width" disabled={submitting}>
                        {submitting ? 'Đang tạo booking...' : 'Tạo booking'}
                    </button>
                </form>
            </div >
            <div className="info-panel">
                <div className="info-card">
                    <h3>Thông tin phim</h3>
                    {selectedMovie ? (
                        <>
                            <p><strong>ID:</strong> {selectedMovie.id}</p>
                            <p><strong>Tên phim:</strong> {selectedMovie.title}</p>
                            <p><strong>Mô tả:</strong> {selectedMovie.description}</p>
                            {selectedMovie.duration && (
                                <p><strong>Thời lượng:</strong> {selectedMovie.duration} phút</p>
                            )}
                        </>
                    ) : (
                        <p>Chọn phim để xem thông tin.</p>
                    )}
                </div>
                {successBooking && (
                    <div className="info-card success-box">
                        <h3>Tạo booking thành công</h3>
                        <p><strong>Booking ID:</strong> {successBooking.id}</p>
                        <p><strong>Movie ID:</strong> {successBooking.movieId}</p>
                        <p><strong>Seat Number:</strong> {successBooking.seatNumber}</p>
                        <p>
                            <strong>Status:</strong> <StatusBadge status={successBooking.status} />
                        </p>
                        <p className="muted-text">
                            Sau khi tạo booking, backend có thể xử lý payment bất đồng bộ qua Kafka.
                            Bạn có thể vào trang Bookings để refresh trạng thái mới nhất.
                        </p>
                    </div>
                )}
            </div>
        </div >
    );
}

export default BookingPage;