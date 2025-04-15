<?php

session_start();

include 'functions.php';

if (!isLogged()) {
    sendHome('error=not_logged_in');
}

$_SESSION = array();

if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(
        session_name(), 
        '', 
        time() - 1, 
        $params['path'], 
        $params['domain'], 
        $params['secure'], 
        $params['httponly']
    );
}

session_destroy();

sendHome('');