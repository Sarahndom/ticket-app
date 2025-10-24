<?php
require_once 'vendor/autoload.php';
$loader = new \Twig\Loader\FilesystemLoader('templates');
$twig = new \Twig\Environment($loader);

// Render login.twig, pass title, hide header, set footer style
echo $twig->render('login.twig', [
    'title' => 'Login',
    'show_header' => false,
    'footer_style' => 'position: absolute; bottom: 0; width: 100%;' // Stick footer to bottom
]);