<?php
require_once 'vendor/autoload.php';
$loader = new \Twig\Loader\FilesystemLoader('templates');
$twig = new \Twig\Environment($loader);

// Get the ticket ID from the URL query parameter (e.g., ?id=123)
$ticketId = isset($_GET['id']) ? $_GET['id'] : null;

// If no ID is provided, redirect back to the tickets list
if (!$ticketId) {
    header('Location: tickets.php');
    exit;
}

echo $twig->render('ticket_edit.twig', [
    'title' => 'Edit Ticket',
    'show_header' => true,
    'ticket_id' => $ticketId // Pass the ID to the template
]);