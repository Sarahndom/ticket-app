// react-ticket-app/src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

// Import the "Brain"
import { isLoggedIn } from '../../../shared-assets/api.js';

export default function ProtectedRoute() {
    if (!isLoggedIn()) {
        // Show a toast message
        toast.error("Your session has expired — please log in again.");

        // Redirect to login page (REQUIRED BY PROMPT)
        return <Navigate to="/auth/login" replace />;
    }

    // If logged in, show the child page (e.g., Dashboard)
    return <Outlet />;
}