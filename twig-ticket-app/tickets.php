<?php
require_once 'vendor/autoload.php';
$loader = new \Twig\Loader\FilesystemLoader('templates');
$twig = new \Twig\Environment($loader);

echo $twig->render('tickets.twig', [
    'title' => 'Manage Tickets',
    'show_header' => true
]);