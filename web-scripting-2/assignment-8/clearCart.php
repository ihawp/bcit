<?php


session_start();

include 'functions.php'; 

if (isLogged()) {
    $_SESSION['cart'] = [];
    header('Location: checkout.php');
} else {
    header('Location: login.php');
}

exit();