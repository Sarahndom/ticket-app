// react-ticket-app/src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../../shared-assets/api.js';

function LoginPage() {
    const [email, setEmail] = useState('test@user.com'); // Pre-filled for easy testing
    const [password, setPassword] = useState('password123'); // Pre-filled for easy testing
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Clear old errors

        if (email === '' || password === '') {
            setError('Email and password are required.');
            return;
        }

        const result = login(email, password);

        if (result.success) {
            toast.success('Login Successful!');
            navigate('/dashboard'); // Redirect to dashboard
        } else {
            setError(result.message); // Show inline error
            toast.error(result.message); // Show toast error
        }
    };

    return (
        <>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login</h2>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Inline error message (REQUIRED) */}
                    {error && <p className="error-inline">{error}</p>}

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Login
                    </button>

                    <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                        No account? <Link to="/auth/signup">Sign Up</Link>
                    </p>
                </form>
            </div>
            <footer style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <div className="container">
                    <p>&copy; 2025 HNG TicketApp. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
}

export default LoginPage;