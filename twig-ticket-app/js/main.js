// Import the SHARED "Brain" (api.js)
import * as api from './api.js';

// --- Simple Toast Notification Function ---
// (We don't have react-toastify here, so we use simple alerts)
function showToast(message, type = 'success') {
    // You could replace this with a prettier custom popup library if desired
    alert(`${type === 'error' ? 'Error: ' : ''}${message}`);
}

/* =============================================
   PAGE PROTECTION (Runs on every page load)
============================================= */
// Find elements that ONLY exist on protected pages (like the logout button)
const logoutButtonCheck = document.getElementById('logout-button');
const needsAuthCheck = document.querySelector('.stats-grid, .ticket-list, #new-ticket-form, #edit-ticket-form'); // Check if we are on a protected page

if ((logoutButtonCheck || needsAuthCheck) && !api.isLoggedIn()) {
    // If we are on a protected page BUT not logged in
    showToast("Your session has expired — please log in again.", 'error');
    window.location.href = 'login.php'; // Redirect (REQUIRED)
}

/* =============================================
   LOGIN PAGE LOGIC
============================================= */
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const errorElement = document.getElementById('error-message');
        errorElement.textContent = '';

        if (emailInput.value === '' || passwordInput.value === '') {
            errorElement.textContent = 'Email and password are required.';
            return;
        }

        const result = api.login(emailInput.value, passwordInput.value);
        if (result.success) {
            showToast(result.message);
            window.location.href = 'dashboard.php'; // Redirect on success (REQUIRED)
        } else {
            errorElement.textContent = result.message; // Show inline error (REQUIRED)
            showToast(result.message, 'error'); // Show toast error (REQUIRED)
        }
    });
}

/* =============================================
   SIGNUP PAGE LOGIC
============================================= */
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const errorElement = document.getElementById('error-message');
        errorElement.textContent = '';

        if (emailInput.value === '' || passwordInput.value === '') {
            errorElement.textContent = 'Email and password are required.';
            return;
        }
        if (passwordInput.value.length < 6) {
            errorElement.textContent = 'Password must be at least 6 characters.';
            return;
        }

        try {
            const result = api.signup(emailInput.value, passwordInput.value);
            if (result.success) {
                showToast(result.message);
                window.location.href = 'dashboard.php'; // Redirect on success (REQUIRED)
            } else {
                errorElement.textContent = result.message;
                showToast(result.message, 'error');
            }
        } catch (err) {
            errorElement.textContent = err.message;
            showToast(err.message, 'error');
        }
    });
}

/* =============================================
   LOGOUT BUTTON LOGIC (In Header)
============================================= */
const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        api.logout(); // Clear session (REQUIRED)
        showToast('Logged out successfully.');
        window.location.href = 'index.php'; // Redirect to landing page (REQUIRED)
    });
}

/* =============================================
   DASHBOARD PAGE LOGIC
============================================= */
const dashboardStatsContainer = document.getElementById('dashboard-stats');
if (dashboardStatsContainer) {
    try {
        const stats = api.getTicketStats();
        document.getElementById('stats-total').textContent = stats.total;
        document.getElementById('stats-open').textContent = stats.open;
        document.getElementById('stats-inProgress').textContent = stats.inProgress;
        document.getElementById('stats-closed').textContent = stats.closed;
    } catch (err) {
        showToast('Failed to load dashboard stats. Please retry.', 'error'); // REQUIRED Error Message
    }
}

/* =============================================
   TICKETS PAGE LOGIC (Read & Delete)
============================================= */
const ticketListContainer = document.getElementById('ticket-list');
if (ticketListContainer) {
    function renderTickets() {
        ticketListContainer.innerHTML = ''; // Clear current list
        try {
            const tickets = api.getTickets();
            const loadingMsg = document.getElementById('loading-tickets');
            if (loadingMsg) loadingMsg.style.display = 'none'; // Hide loading message

            if (tickets.length === 0) {
                ticketListContainer.innerHTML = '<p>No tickets found. Create one!</p>';
                return;
            }

            tickets.forEach(ticket => {
                const card = document.createElement('div');
                card.className = `ticket-card status-${ticket.status}`; // Add status class for border color
                card.innerHTML = `
                    <div>
                        <h3>${ticket.title}</h3>
                        <p>${ticket.description || 'No description provided.'}</p>
                    </div>
                    <div>
                        <span class="status-tag status-tag-${ticket.status}">
                            ${ticket.status.replace('_', ' ')}
                        </span>
                        <div class="ticket-card-actions">
                            <a href="ticket_edit.php?id=${ticket.id}" class="btn btn-secondary" style="padding: 0.25rem 0.75rem;">Edit</a>
                            <button data-id="${ticket.id}" class="btn btn-danger delete-btn" style="padding: 0.25rem 0.75rem;">Delete</button>
                        </div>
                    </div>
                `;
                ticketListContainer.appendChild(card);
            });

            // Add event listeners AFTER creating the buttons
            addDeleteListeners();

        } catch (err) {
            showToast('Failed to load tickets. Please retry.', 'error'); // REQUIRED Error Message
            ticketListContainer.innerHTML = '<p style="color: red;">Error loading tickets.</p>';
        }
    }

    function addDeleteListeners() {
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const ticketId = button.getAttribute('data-id');
                // Confirmation step (REQUIRED)
                if (window.confirm('Are you sure you want to delete this ticket?')) {
                    try {
                        api.deleteTicket(ticketId);
                        showToast('Ticket deleted successfully!');
                        renderTickets(); // Re-render the list
                    } catch (error) {
                        showToast(error.message, 'error');
                    }
                }
            });
        });
    }

    // Initial render
    renderTickets();
}


/* =============================================
   NEW TICKET PAGE LOGIC (Create)
============================================= */
const newTicketForm = document.getElementById('new-ticket-form');
if (newTicketForm) {
    newTicketForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const titleInput = document.getElementById('title');
        const statusInput = document.getElementById('status');
        const priorityInput = document.getElementById('priority');
        const descriptionInput = document.getElementById('description');
        const errorElement = document.getElementById('error-message');
        const errorTitle = document.getElementById('error-title');
        const errorStatus = document.getElementById('error-status');

        // Clear previous errors
        errorElement.textContent = '';
        errorTitle.textContent = '';
        errorStatus.textContent = '';

        const ticketData = {
            title: titleInput.value.trim(),
            status: statusInput.value,
            priority: priorityInput.value,
            description: descriptionInput.value.trim()
        };

        // --- Validation (REQUIRED) ---
        let isValid = true;
        if (!ticketData.title) {
            errorTitle.textContent = 'Title is mandatory.';
            isValid = false;
        }
        if (!ticketData.status) {
            errorStatus.textContent = 'Status is mandatory.';
            isValid = false;
        }
        if (!['open', 'in_progress', 'closed'].includes(ticketData.status)) {
            errorStatus.textContent = 'Invalid status value.';
            isValid = false;
        }
        // Optional field validation (example)
        if (ticketData.description && ticketData.description.length > 500) {
            // You'd add a <p id="error-description"> tag in the HTML
            document.getElementById('error-description').textContent = 'Description cannot exceed 500 characters.';
            isValid = false;
        }

        if (!isValid) {
            showToast('Please fix the errors in the form.', 'error');
            return;
        }

        try {
            api.createTicket(ticketData);
            showToast('Ticket created successfully!');
            window.location.href = 'tickets.php'; // Redirect to list
        } catch (err) {
            errorElement.textContent = err.message;
            showToast(err.message, 'error');
        }
    });
}

/* =============================================
   EDIT TICKET PAGE LOGIC (Update)
============================================= */
const editTicketForm = document.getElementById('edit-ticket-form');
if (editTicketForm) {
    const ticketIdInput = document.getElementById('ticket-id');
    const ticketId = ticketIdInput.value; // Get the ID passed from PHP

    const titleInput = document.getElementById('title');
    const statusInput = document.getElementById('status');
    const priorityInput = document.getElementById('priority');
    const descriptionInput = document.getElementById('description');
    const errorElement = document.getElementById('error-message');
    const errorTitle = document.getElementById('error-title');
    const errorStatus = document.getElementById('error-status');

    // --- 1. Load existing data when page loads ---
    try {
        const ticket = api.getTicket(ticketId);
        if (ticket) {
            titleInput.value = ticket.title;
            statusInput.value = ticket.status;
            priorityInput.value = ticket.priority;
            descriptionInput.value = ticket.description || '';
        } else {
            showToast('Ticket not found.', 'error');
            window.location.href = 'tickets.php'; // Redirect if ticket doesn't exist
        }
    } catch (err) {
        showToast('Failed to load ticket data. Please retry.', 'error');
        window.location.href = 'tickets.php';
    }

    // --- 2. Handle form submission ---
    editTicketForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // Clear previous errors
        errorElement.textContent = '';
        errorTitle.textContent = '';
        errorStatus.textContent = '';

        const updatedData = {
            title: titleInput.value.trim(),
            status: statusInput.value,
            priority: priorityInput.value,
            description: descriptionInput.value.trim()
        };

        // --- Validation (REQUIRED) ---
        let isValid = true;
        if (!updatedData.title) {
            errorTitle.textContent = 'Title is mandatory.';
            isValid = false;
        }
        if (!updatedData.status) {
            errorStatus.textContent = 'Status is mandatory.';
            isValid = false;
        }
        if (!['open', 'in_progress', 'closed'].includes(updatedData.status)) {
            errorStatus.textContent = 'Invalid status value.';
            isValid = false;
        }

        if (!isValid) {
            showToast('Please fix the errors in the form.', 'error');
            return;
        }

        try {
            api.updateTicket(ticketId, updatedData);
            showToast('Ticket updated successfully!');
            window.location.href = 'tickets.php'; // Redirect to list
        } catch (err) {
            errorElement.textContent = err.message;
            showToast(err.message, 'error');
        }
    });
}