// react-ticket-app/src/pages/DashboardPage.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTicketStats, logout } from '../../../shared-assets/api.js';

// This is a new component we will create inside this file
function AppHeader() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to landing page
    };

    return (
        <nav className="app-nav">
            <div className="container">
                <Link to="/dashboard" className="app-nav-logo">TicketApp</Link>
                <ul>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/tickets">Tickets</Link></li>
                    <li><button onClick={handleLogout} className="btn btn-secondary">Logout</button></li>
                </ul>
            </div>
        </nav>
    );
}

// This is the main page component
function DashboardPage() {
    const [stats, setStats] = useState({ total: 0, open: 0, inProgress: 0, closed: 0 });

    useEffect(() => {
        // Load stats when the page opens
        setStats(getTicketStats());
    }, []);

    return (
        <>
            <AppHeader />
            <main className="container">
                <div className="page-header">
                    <h1>Dashboard</h1>
                    <Link to="/tickets/new" className="btn btn-primary">Create New Ticket</Link>
                </div>

                <p style={{ marginBottom: '1.5rem' }}>Welcome! Here's a summary of your tickets.</p>

                {/* Dashboard Stats (REQUIRED) */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>Total Tickets</h3>
                        <p>{stats.total}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Open Tickets</h3>
                        <p style={{ color: '#28a745' }}>{stats.open}</p>
                    </div>
                    <div className="stat-card">
                        <h3>In Progress</h3>
                        <p style={{ color: '#ffc107' }}>{stats.inProgress}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Closed Tickets</h3>
                        <p style={{ color: '#6c757d' }}>{stats.closed}</p>
                    </div>
                </div>
            </main>
            <footer style={{ marginTop: '4rem' }}>
                <div className="container">
                    <p>&copy; 2025 HNG TicketApp. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
}

export default DashboardPage;