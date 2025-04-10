<?php


function isLogged() {
    return isset($_SESSION['username']) && isset($_SESSION['cart']) && isset($_SESSION['timestamp']);
}

function cleanString($string) {
    return stripslashes(trim(htmlspecialchars($string)));
}

function sendToType($type, $string) {
    header('Location: '.$type.'.php?'.$string);
}


function formatString($string) {
    return ucfirst(strtolower($string));
}

function printCart() {
    if (isset($_SESSION['cart'])) {

        echo '<h2>Your Cart:</h2>';

        if ($_SESSION['cart'] !== []) {

            echo '<ul>';

            foreach ($_SESSION['cart'] as $key => $value) {

                if ($value != 0) {
                    echo '<li>'.$value.' '.$key.'</li>';
                }

            }

            echo '</ul>';

        } else {
            echo '<p>Your cart is empty.</p>';
        }
    }
}

function printItemsAdded() {
    if (isset($_GET['quantity']) && isset($_GET['type'])) {
        $quantity = cleanString($_GET['quantity']);
        $type = cleanString($_GET['type']);
        if (is_numeric($quantity) && is_string($type)) {
            echo '<p class="alert">Successfully added '.$quantity.' '.$type.' to cart.';
        }
    }
}