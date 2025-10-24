<?php
require_once 'vendor/autoload.php';
$loader = new \Twig\Loader\FilesystemLoader('templates');
$twig = new \Twig\Environment($loader);

echo $twig->render('ticket_new.twig', [
    'title' => 'Create Ticket',
    'show_header' => true
]);