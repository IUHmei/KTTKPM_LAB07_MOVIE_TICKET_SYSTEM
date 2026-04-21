import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
    const navigate = useNavigate();
    const { login, loading } = useAuth();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        const result = await login(formData);

        if (result.success) {
            navigate('/movies');
        } else {
            setMessage(result.message);
        }
    };

    return (
        <div className="auth-page">
            <form className="form-card" onSubmit={handleSubmit}>
                <h2>Đăng nhập</h2>

                {message && <div className="alert alert-error">{message}</div>}

                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button className="btn btn-primary full-width" disabled={loading}>
                    {loading ? 'Đang đăng nhập...' : 'Login'}
                </button>

                <p className="form-footer">
                    Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
                </p>
            </form>
        </div>
    );
}

export default LoginPage;