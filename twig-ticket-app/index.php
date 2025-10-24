<?php
require_once 'vendor/autoload.php'; // Load Twig
$loader = new \Twig\Loader\FilesystemLoader('templates');
$twig = new \Twig\Environment($loader);

// Render landing.twig, pass title, and hide the app header
echo $twig->render('landing.twig', [
    'title' => 'Welcome to TicketApp',
    'show_header' => false // Don't show Dashboard header here
]);