// react-ticket-app/src/App.jsx

import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

// Import your page components (we will create these next)
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import TicketsPage from './pages/TicketsPage';
import TicketNewPage from './pages/TicketNewPage';
import TicketEditPage from './pages/TicketEditPage';

// Import your Protected Route component (we will create this)
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <BrowserRouter>
            {/* This component allows toasts to appear anywhere in the app */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

            <Routes>
                {/* --- Public Routes --- */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/signup" element={<SignupPage />} />

                {/* --- Protected Routes (Must be logged in) --- */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/tickets" element={<TicketsPage />} />
                    <Route path="/tickets/new" element={<TicketNewPage />} />
                    <Route path="/tickets/edit/:ticketId" element={<TicketEditPage />} />
                </Route>

                {/* Redirect any unknown URL back to the landing page */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App