# Ticket Management App (Twig/PHP Version)

This is the **Twig/PHP** implementation of the HNG Stage 2 Ticket App. It uses PHP for server-side templating with Twig and vanilla JavaScript for all client-side logic and interaction with `localStorage`.

## Frameworks & Libraries

-   **PHP 8.x** (Check your XAMPP version)
-   **Twig 3.x** (Template Engine)
-   **Composer** (PHP Package Manager)
-   **Vanilla JavaScript** (ES Modules for client-side logic)

## Setup & Execution

1.  **Ensure XAMPP is running** with the **Apache** module started.
2.  **Copy** the entire `hng-stage-2-ticket-app` project folder into your XAMPP `htdocs` directory (e.g., `C:\xampp\htdocs`).
3.  Navigate to this folder in your terminal: `cd C:\xampp\htdocs\hng-stage-2-ticket-app\twig-ticket-app`
4.  Install Twig: `composer require twig/twig` (or `composer install` if `composer.json` already exists).
5.  Open your web browser and go to: `http://localhost/hng-stage-2-ticket-app/twig-ticket-app/index.php`

## Test User Credentials

-   **Email:** `test@user.com`
-   **Password:** `password123`

## Notes

-   This version does not use a JavaScript framework like React or Vue. All DOM manipulation and API calls are handled by `js/main.js` using standard browser features.
-   Page protection is implemented via a JavaScript check at the top of protected `.twig` templates that redirects if the `localStorage` session key is missing.