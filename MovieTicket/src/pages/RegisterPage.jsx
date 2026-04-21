import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RegisterPage() {
    const navigate = useNavigate();
    const { register, loading } = useAuth();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        fullName: '',
    });
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setSuccess(false);
        const result = await register(formData);

        if (result.success) {
            setSuccess(true);
            setMessage('Đăng ký thành công. Hãy đăng nhập để tiếp tục.');
            setTimeout(() => navigate('/login'), 1000);
        } else {
            setSuccess(false);
            setMessage(result.message);
        }
    };

    return (
        <div className="auth-page">
            <form className="form-card" onSubmit={handleSubmit}>
                <h2>Đăng ký</h2>

                {message && (
                    <div className={`alert ${success ? 'alert-success' : 'alert-error'}`}>
                        {message}
                    </div>
                )}

                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
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
                    {loading ? 'Đang đăng ký...' : 'Register'}
                </button>
                <p className="form-footer">
                    Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                </p>
            </form>
        </div>
    );
}

export default RegisterPage;