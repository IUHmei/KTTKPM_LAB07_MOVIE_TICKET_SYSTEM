import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/movies" className="brand">
                    Movie Ticket System
                </Link>
            </div>
            <div className="navbar-right">
                {isAuthenticated ? (
                    <>
                        <NavLink to="/movies" className="nav-link">
                            Movies
                        </NavLink>
                        <NavLink to="/bookings" className="nav-link">
                            Bookings
                        </NavLink>
                        <span className="user-info">
                            Xin chào, <strong>{user?.fullName || user?.username}</strong>
                        </span>
                        <button className="btn btn-danger" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" className="nav-link">
                            Login
                        </NavLink>
                        <NavLink to="/register" className="nav-link">
                            Register
                        </NavLink>
                    </>
                )}
            </div>
        </nav>
    );
}
export default Navbar;