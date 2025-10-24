// react-ticket-app/src/pages/TicketsPage.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTickets, logout, deleteTicket } from '../../../shared-assets/api.js';
import { toast } from 'react-toastify';

// Re-using the header from the Dashboard
function AppHeader() {
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="app-nav">
            <div className="container">
                <Link to="/dashboard" className="app-nav-logo">TicketApp</Link>
                <ul>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/tickets" style={{ fontWeight: '600' }}>Tickets</Link></li>
                    <li><button onClick={handleLogout} className="btn btn-secondary">Logout</button></li>
                </ul>
            </div>
        </nav>
    );
}

// Main page component
function TicketsPage() {
    const [tickets, setTickets] = useState([]);
    const navigate = useNavigate();

    // Function to load tickets from the "Brain"
    const loadTickets = () => {
        setTickets(getTickets());
    };

    // Load tickets when the page first opens
    useEffect(() => {
        loadTickets();
    }, []);

    // Handle the delete button click
    const handleDelete = (id) => {
        // Show confirmation (REQUIRED)
        if (window.confirm('Are you sure you want to delete this ticket?')) {
            try {
                deleteTicket(id);
                toast.success('Ticket deleted successfully!');
                loadTickets(); // Refresh the list
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    return (
        <>
            <AppHeader />
            <main className="container">
                <div className="page-header">
                    <h1>Ticket Management</h1>
                    <Link to="/tickets/new" className="btn btn-primary">Create New Ticket</Link>
                </div>

                {/* Ticket Card List (REQUIRED) */}
                <div className="ticket-list">
                    {tickets.length === 0 && <p>No tickets found. Create one!</p>}

                    {tickets.map(ticket => (
                        <div key={ticket.id} className={`ticket-card status-${ticket.status}`}>
                            <div>
                                <h3>{ticket.title}</h3>
                                <p>{ticket.description || 'No description provided.'}</p>
                            </div>
                            <div>
                                <span className={`status-tag status-tag-${ticket.status}`}>
                                    {ticket.status.replace('_', ' ')}
                                </span>
                                <div className="ticket-card-actions">
                                    <Link to={`/tickets/edit/${ticket.id}`} className="btn btn-secondary" style={{ padding: '0.25rem 0.75rem' }}>Edit</Link>
                                    <button onClick={() => handleDelete(ticket.id)} className="btn btn-danger" style={{ padding: '0.25rem 0.75rem' }}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
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

export default TicketsPage;