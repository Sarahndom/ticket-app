// react-ticket-app/src/pages/LandingPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <>
            <div className="hero">
                {/* These are the CSS-only circles (REQUIRED) */}
                <div className="deco-circle circle-hero-overlap"></div>

                <div className="container hero-content">
                    <h1>Welcome to TicketApp</h1>
                    <p>Your one-stop solution for managing all your support tickets.</p>
                    <div>
                        <Link to="/auth/login" className="btn btn-primary" style={{ marginRight: '1rem' }}>Login</Link>
                        <Link to="/auth/signup" className="btn btn-secondary">Get Started</Link>
                    </div>
                </div>

                {/* This is the Wavy SVG (REQUIRED) */}

                <img
                    src="../../../shared-assets/hero-wave.svg"
                    alt=""
                    className="hero-wave"
                />

            </div>

            <div className="features">
                <div className="container">
                    <h2>Why Choose Us?</h2>
                    <div className="features-grid">
                        {/* These are the "box-shaped sections" (REQUIRED) */}
                        <div className="feature-box">
                            <h3>Manage Tickets</h3>
                            <p>Full Create, Read, Update, and Delete functionality for all your tickets.</p>
                        </div>
                        <div className="feature-box">
                            <h3>See Stats</h3>
                            <p>A simple, high-level dashboard to see your team's progress at a glance.</p>
                        </div>
                        <div className="feature-box">
                            <h3>Secure & Fast</h3>
                            <p>Your data is safe with our secure (simulated) authentication.</p>
                        </div>
                    </div>
                </div>

                {/* This is the other decorative circle (REQUIRED) */}
                <div className="deco-circle circle-content"></div>
            </div>

            {/* This is the footer (REQUIRED) */}
            <footer>
                <div className="container">
                    <p>&copy; 2025 HNG TicketApp. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
}

export default LandingPage;