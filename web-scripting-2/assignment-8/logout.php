<?php

session_start();

include 'functions.php';

if (isLogged()) {
    $username = formatString($_SESSION['username']);
    $loggedTimeInSeconds = time() - $_SESSION['timestamp'];
} else {
    header('Location: login.php');
    exit();
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

?>


<!doctype html>
<html lang="en">
    <head>

        <link rel="preload stylesheet" as="style" href="styles.css">

    </head>
    <body>
        <header>
            <nav>
                <ul>
                    <li>
                        <a href="login.php" title="Login">Login</a>
                    </li>
                </ul>
            </nav>
        </header>
        <main>
            <header>
                <h1>Logged Out Successfully</h1>
            </header>
            <section>
                <p>You were logged in for <?= $loggedTimeInSeconds ?> seconds. Thanks for your time, <?= $username ?>!</p>
                <p>If you would like to shop in our online store, you will need to log in.</p>
            </section>
            <section>
                <h2>Want to log in?</h2>
                <a href="login.php">Log In Here!</a>
            </section>
        </main>
    </body>
</html>