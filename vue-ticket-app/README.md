# Ticket Management App (Vue.js Version)

This is the **Vue.js** implementation of the HNG Stage 2 Ticket App, built using Vite. It shares CSS, assets, and `localStorage` logic with the React and Twig versions.

## Frameworks & Libraries

* **Vue 3** (Composition API with `<script setup>`)
* **Vite** (Build Tool)
* **Vue Router 4** (Routing)
* **Vue Toastification** (Notifications)

## Setup & Execution

1.  Navigate to this folder in your terminal:
    ```sh
    cd path/to/hng-stage-2-ticket-app/vue-ticket-app
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

* **Views (Pages):** Located in `src/views`, each `.vue` file represents a distinct view (e.g., `LandingView.vue`, `LoginView.vue`, `DashboardView.vue`, `TicketsView.vue`, `TicketNewView.vue`, `TicketEditView.vue`).
* **Components:** Reusable UI parts are in `src/components` (e.g., `AppHeader.vue`).
* **State Management:** Primarily uses Vue's `ref()` function within components (`<script setup>`) for reactive form inputs and local UI state. All persistent data (users, tickets) is managed via functions imported from `shared-assets/api.js`, which interacts with `localStorage`.
* **Routing:** Handled by `vue-router` in `src/router/index.js`. Protected routes use a navigation guard (`router.beforeEach`) defined in the router file.

## Accessibility Notes

* Semantic HTML elements (`nav`, `main`, `footer`, `button`, form elements with labels) are used within the `<template>` blocks.
* Basic focus states are provided by the shared CSS (`styles.css`).
* Form inputs are linked to labels.
* Alt text should be added if more images are introduced.

## Known Issues

* Notifications currently use `vue-toastification`. The Twig version uses basic `alert()` popups. Visual consistency could be improved with a shared notification component or library if needed.
* No complex state management library (like Pinia or Vuex) is used, relying on `localStorage` and component state.

## Test User Credentials

* **Email:** `test@user.com`
* **Password:** `password123`