// react-ticket-app/src/pages/TicketEditPage.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { logout, getTicket, updateTicket } from '../../../shared-assets/api.js';
import { toast } from 'react-toastify';

// Re-using the header
function AppHeader() {
    const navigate = useNavigate();
    const handleLogout = () => { logout(); navigate('/'); };
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
function TicketEditPage() {
    // Get the "ticketId" from the URL (e.g., /edit/123)
    const { ticketId } = useParams();

    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('open');
    const [priority, setPriority] = useState('medium');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // 1. Load the ticket's data when the page opens
    useEffect(() => {
        try {
            const ticket = getTicket(ticketId);
            if (ticket) {
                setTitle(ticket.title);
                setStatus(ticket.status);
                setPriority(ticket.priority);
                setDescription(ticket.description || '');
            } else {
                toast.error('Ticket not found');
                navigate('/tickets');
            }
        } catch (err) {
            toast.error(err.message);
            navigate('/tickets');
        }
    }, [ticketId, navigate]);

    // 2. Handle the form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Validation (REQUIRED)
        if (title === '' || status === '') {
            setError('Title and status are mandatory.');
            toast.error('Title and status are mandatory.');
            return;
        }

        try {
            // Call the "Brain" to update the ticket
            updateTicket(ticketId, { title, status, priority, description });
            toast.success('Ticket updated successfully!');
            navigate('/tickets'); // Go back to the ticket list
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        }
    };

    return (
        <>
            <AppHeader />
            <main className="container">
                <div className="form-container" style={{ maxWidth: '700px', margin: '2rem auto' }}>
                    <form onSubmit={handleSubmit}>
                        <h2 style={{ marginBottom: '1.5rem' }}>Edit Ticket #{ticketId}</h2>

                        {error && <p className="error-inline" style={{ marginBottom: '1rem' }}>{error}</p>}

                        <div className="form-group">
                            <label htmlFor="title">Title (Mandatory)</label>
                            <input
                                type="text"
                                id="title"
                                className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="status">Status (Mandatory)</label>
                            <select
                                id="status"
                                className="form-control"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="open">Open</option>
                                <option value="in_progress">In Progress</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="priority">Priority (Optional)</label>
                            <select
                                id="priority"
                                className="form-control"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description (Optional)</label>
                            <textarea
                                id="description"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                            <Link to="/tickets" className="btn btn-secondary">Cancel</Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}

export default TicketEditPage;