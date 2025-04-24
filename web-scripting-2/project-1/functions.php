<?php

function cleanString($string) {
    return stripcslashes(trim(htmlspecialchars($string)));
}

function send($location) {
    header('Location: '.$location);
    exit();
}

function isLogged() {
    return isset($_SESSION['id']) && isset($_SESSION['username']);
}

function uppercwords($string) {
    return ucwords(strtolower($string));
}

function uppercfirst($string) {
    return ucfirst(strtolower($string));
}