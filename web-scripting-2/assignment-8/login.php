<?php

session_start();
session_regenerate_id(true);

include 'config.php';
include 'functions.php';

if (isLogged()) {

    header('Location: index.php');

}



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
                <h1>Login</h1>
            </header>
            <section>
                <form action="processLogin.php" method="POST" id="login-form"><?php
                    if (isset($_GET['success']) && $_GET['success'] === 'false') {

                        if (isset($_GET['username'])) {
                            echo "<p>The username '".$_GET['username']."' is not one of our registered user.</p>";
                        }

                        if (isset($_GET['password'])) {
                            echo "<p>No, sorry. '".$_GET['password']."' is not the secret password. (Hint try: 'bcit').</p>";
                        }

                    }
                    ?><label for="username">Username:</label>
                    <input type="text" id="username" name="username">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password">
                    <button type="submit">Login</button>
                </form>
            </section>
        </main>
    </body>
</html>