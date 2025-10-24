# Ticket Management App (React Version)

This is the **React** implementation of the HNG Stage 2 Ticket App, built using Vite. It shares CSS, assets, and `localStorage` logic with the Vue and Twig versions.

## Frameworks & Libraries

* **React 18** (UI Library)
* **Vite** (Build Tool)
* **React Router DOM v6** (Routing)
* **React Toastify** (Notifications)

## Setup & Execution

1.  Navigate to this folder in your terminal:
    ```sh
    cd path/to/hng-stage-2-ticket-app/react-ticket-app
    ```
2.  Install dependencies:
    ```sh
    npm install
    ```
3.  Run the development server:
    ```sh
    npm run dev
    ```
4.  Open the local URL provided in your browser (usually `http://localhost:5173`).

## UI Components & State

* **Pages:** Located in `src/pages`, each file represents a distinct view (e.g., `LandingPage.jsx`, `LoginPage.jsx`, `DashboardPage.jsx`, `TicketsPage.jsx`, `TicketNewPage.jsx`, `TicketEditPage.jsx`).
* **Components:** Reusable UI parts are in `src/components` (e.g., `ProtectedRoute.jsx`, `AppHeader.jsx` - implicitly used in Dashboard/Ticket pages).
* **State Management:** Primarily uses React's `useState` hook within components for form inputs and local UI state. All persistent data (users, tickets) is managed via functions imported from `shared-assets/api.js`, which interacts with `localStorage`.
* **Routing:** Handled by `react-router-dom` in `src/App.jsx`. Protected routes use the `ProtectedRoute` component.

## Accessibility Notes

* Semantic HTML elements (`nav`, `main`, `footer`, `button`, form elements with labels) are used where appropriate.
* Basic focus states are provided by the shared CSS (`styles.css`).
* Form inputs are linked to labels.
* Alt text should be added if more images are introduced.

## Known Issues

* Notifications currently use `react-toastify`. The Twig version uses basic `alert()` popups. Visual consistency could be improved with a shared notification component or library if needed.
* No complex state management library (like Redux or Zustand) is used, relying on `localStorage` and component state.

## Test User Credentials

* **Email:** `test@user.com`
* **Password:** `password123`