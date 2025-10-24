<?php
require_once 'vendor/autoload.php';
$loader = new \Twig\Loader\FilesystemLoader('templates');
$twig = new \Twig\Environment($loader);

echo $twig->render('signup.twig', [
    'title' => 'Sign Up',
    'show_header' => false,
    'footer_style' => 'position: absolute; bottom: 0; width: 100%;'
]);