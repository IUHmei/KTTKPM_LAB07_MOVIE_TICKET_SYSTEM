import { useNavigate } from 'react-router-dom';

function MovieCard({ movie }) {
    const navigate = useNavigate();

    return (
        <div className="movie-card">
            <h3>{movie.title}</h3>
            <p><strong>ID:</strong> {movie.id}</p>
            <p>{movie.description}</p>
            {movie.duration && <p><strong>Duration:</strong> {movie.duration} phút</p>}
            {movie.genre && <p><strong>Genre:</strong> {movie.genre}</p>}

            <button
                className="btn btn-primary"
                onClick={() => navigate(`/booking/${movie.id}`)}
            >
                Đặt vé
            </button>
        </div>
    );
}

export default MovieCard;