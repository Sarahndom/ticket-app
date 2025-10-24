/* =============================================
   THIS IS YOUR "BRAIN" / FAKE API
   (api.js)
   This file manages all your data and auth.
   All 3 apps (React, Vue, Twig) will import
   and use these exact same functions.
============================================= */

// This is the database key
const DB_KEY = 'ticketapp_db';
// This is the session token key (REQUIRED BY PROMPT)
const SESSION_KEY = 'ticketapp_session';

/* --- PRIVATE HELPER FUNCTIONS --- */

/**
 * Gets the entire "database" from localStorage.
 */
function _getDB() {
    const db = localStorage.getItem(DB_KEY);
    if (!db) {
        // If no DB, create a default one with a test user
        const defaultDB = {
            users: [
                { email: 'test@user.com', password: 'password123' }
            ],
            tickets: [
                { id: 1678886400000, title: 'Fix login button bug', status: 'open', description: 'The login button is not working on Safari.', priority: 'high' },
                { id: 1678886400001, title: 'Update homepage copy', status: 'in_progress', description: 'Marketing needs new copy on the landing page.', priority: 'medium' },
                { id: 1678886400002, title: 'Add a footer', status: 'closed', description: 'The site is missing a footer.', priority: 'low' }
            ]
        };
        localStorage.setItem(DB_KEY, JSON.stringify(defaultDB));
        return defaultDB;
    }
    return JSON.parse(db);
}

/**
 * Saves the entire "database" back to localStorage.
 */
function _saveDB(db) {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
}

/* --- AUTHENTICATION API --- */

/**
 * Logs a user in.
 * @param {string} email
 * * @param {string} password
 * @returns {object} { success: boolean, message: string }
 */
export function login(email, password) {
    const db = _getDB();
    const user = db.users.find(u => u.email === email && u.password === password);

    if (user) {
        // Set the session token (REQUIRED BY PROMPT)
        localStorage.setItem(SESSION_KEY, user.email);
        return { success: true, message: 'Login successful!' };
    } else {
        return { success: false, message: 'Invalid credentials. Please try again.' };
    }
}

/**
 * Registers a new user.
 * @param {string} email
 * @param {string} password
 * @returns {object} { success: boolean, message: string }
 */
export function signup(email, password) {
    const db = _getDB();
    const userExists = db.users.find(u => u.email === email);

    if (userExists) {
        return { success: false, message: 'User with this email already exists.' };
    }

    db.users.push({ email, password });
    _saveDB(db);

    // Log them in immediately
    localStorage.setItem(SESSION_KEY, email);
    return { success: true, message: 'Signup successful! Redirecting...' };
}

/**
 * Logs the current user out.
 */
export function logout() {
    // Clear the session token (REQUIRED BY PROMPT)
    localStorage.removeItem(SESSION_KEY);
}

/**
 * Checks if a user is currently logged in.
 * @returns {boolean}
 */
export function isLoggedIn() {
    return localStorage.getItem(SESSION_KEY) !== null;
}

/* --- TICKET CRUD API --- */

/**
 * Gets all tickets.
 * @returns {Array} An array of ticket objects
 */
export function getTickets() {
    const db = _getDB();
    return db.tickets;
}

/**
 * Gets a single ticket by its ID.
 * @param {number} id
 * @returns {object|undefined}
 */
export function getTicket(id) {
    const db = _getDB();
    // Use Number() to make sure we compare numbers, not string vs number
    return db.tickets.find(t => t.id === Number(id));
}

/**
 * Creates a new ticket.
 * @param {object} ticketData - { title, description, priority, status }
 * @returns {object} The new ticket
 */
export function createTicket(ticketData) {
    const db = _getDB();

    // Validate required fields
    if (!ticketData.title || !ticketData.status) {
        throw new Error("Title and status are mandatory.");
    }
    // Validate status value
    if (!['open', 'in_progress', 'closed'].includes(ticketData.status)) {
        throw new Error("Invalid status value.");
    }

    const newTicket = {
        ...ticketData,
        id: Date.now(), // Simple unique ID
    };
    db.tickets.push(newTicket);
    _saveDB(db);
    return newTicket;
}

/**
 * Updates an existing ticket.
 * @param {number} id
 * @param {object} updates - { title, description, status, priority }
 * @returns {object} The updated ticket
 */
export function updateTicket(id, updates) {
    // Validate required fields
    if (updates.title === '' || updates.status === '') {
        throw new Error("Title and status are mandatory.");
    }
    // Validate status value
    if (updates.status && !['open', 'in_progress', 'closed'].includes(updates.status)) {
        throw new Error("Invalid status value.");
    }

    const db = _getDB();
    const index = db.tickets.findIndex(t => t.id === Number(id));

    if (index > -1) {
        // Merge updates into the existing ticket
        db.tickets[index] = { ...db.tickets[index], ...updates };
        _saveDB(db);
        return db.tickets[index];
    }
    throw new Error('Ticket not found');
}

/**
 * Deletes a ticket.
 * @param {number} id
 * @returns {boolean} True on success
 */
export function deleteTicket(id) {
    let db = _getDB();
    const initialLength = db.tickets.length;
    db.tickets = db.tickets.filter(t => t.id !== Number(id));

    if (db.tickets.length < initialLength) {
        _saveDB(db);
        return true;
    }
    throw new Error('Ticket not found, could not delete.');
}

/* --- DASHBOARD API --- */

/**
 * Gets stats for the dashboard.
 * @returns {object} { total, open, inProgress, closed }
 */
export function getTicketStats() {
    const tickets = getTickets();
    return {
        total: tickets.length,
        open: tickets.filter(t => t.status === 'open').length,
        inProgress: tickets.filter(t => t.status === 'in_progress').length,
        closed: tickets.filter(t => t.status === 'closed').length
    };
}