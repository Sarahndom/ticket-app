// react-ticket-app/src/pages/SignupPage.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signup } from '../../../shared-assets/api.js';


function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (email === '' || password === '') {
            setError('Email and password are required.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        try {
            const result = signup(email, password);

            if (result.success) {
                toast.success(result.message);
                navigate('/dashboard'); // Redirect to dashboard
            } else {
                setError(result.message);
                toast.error(result.message);
            }
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        }
    };

    return (
        <>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Get Started</h2>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
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
                            placeholder="6+ characters"
                        />
                    </div>

                    {error && <p className="error-inline">{error}</p>}

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Create Account
                    </button>

                    <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                        Already have an account? <Link to="/auth/login">Login</Link>
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

export default SignupPage;