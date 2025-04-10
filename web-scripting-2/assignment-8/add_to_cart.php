<?php

session_start();

include 'config.php';
include 'functions.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isLogged()) {
        $type = cleanString($_POST['type']);
        $quantity = cleanString($_POST['quantity']);
        if (is_numeric($quantity) && is_string($type) && in_array($type, PRODUCT_LIST)) {
            $_SESSION['cart'][$type] += $quantity;
            sendToType($type, 'quantity='.$quantity.'&type='.$type.'');
        } else {
            sendToType($type, 'success=false');
        }
    } else {
        sendToType($type, 'success=false');
    }
} else {
    sendToType($type, 'success=false');
}

exit();
