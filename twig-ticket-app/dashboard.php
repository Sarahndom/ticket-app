<?php
require_once 'vendor/autoload.php';
$loader = new \Twig\Loader\FilesystemLoader('templates');
$twig = new \Twig\Environment($loader);

// Render dashboard.twig, show header
echo $twig->render('dashboard.twig', [
    'title' => 'Dashboard',
    'show_header' => true // Show the app navigation bar
]);