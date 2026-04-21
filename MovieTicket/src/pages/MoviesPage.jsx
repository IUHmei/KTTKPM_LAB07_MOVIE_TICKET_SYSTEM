import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import MovieCard from '../components/MovieCard';
import { getMovies } from '../services/movieService';

function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        setLoading(true);
        setError('');

        try {
            const data = await getMovies();
            setMovies(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err?.response?.data?.message || 'Không tải được danh sách phim');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="page-container">
            <div className="page-header">
                <h2>Danh sách phim</h2>
                <button className="btn btn-secondary" onClick={fetchMovies}>
                    Refresh
                </button>
            </div>

            {loading && <Loader text="Đang tải danh sách phim..." />}
            {error && <div className="alert alert-error">{error}</div>}

            {!loading && !error && (
                <div className="movie-grid">
                    {movies.length > 0 ? (
                        movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
                    ) : (
                        <div className="empty-box">Chưa có phim nào.</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default MoviesPage;