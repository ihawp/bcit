<?php


session_start();

include 'config.php';
include 'functions.php';

if (isset($_SESSION['last-time'])) {
    if ($_SESSION['last-time'] > time() - TIMEOUT_IN_SECONDS) {
        header('Location: login.php?success=false');
        exit();
    }
}

$_SESSION['last-time'] = time();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $username = cleanString($_POST['username']);

    if (in_array($username, REGISTERED_USERS) && strlen($username) > 2 && strlen($username) < 16 && is_string($username)) {
        $password = $_POST['password'];
        if ($password === SECRET_PASSWORD) {
            //log user in
            $_SESSION['username'] = $username;
            $_SESSION['timestamp'] = time();
            $_SESSION['cart'] = [];
    
            for ($i = 0; $i < sizeof(PRODUCT_LIST); $i++ ) {
                $_SESSION['cart'][PRODUCT_LIST[$i]] = 0;
            }
    
            header('Location: gears.php?success=true');
        } else {
            header('Location: login.php?success=false&password='.$password.'');
        }
    } else {
        header('Location: login.php?success=false&username='.$username.'');
    }
} else {
    header('Location: login.php?success=false');
}

$_SESSION['last-time'] = time();