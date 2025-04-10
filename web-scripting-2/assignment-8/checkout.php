<?php


session_start();

include 'functions.php';

if (!isLogged()) {
    header('Location: login.php');
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
                        <a href="gears.php" title="Gears">Gears</a>
                    </li>
                    <li>
                        <a href="brushes.php" title="Brushes">Brushes</a>
                    </li>
                    <li>
                        <a href="wrenches.php" title="Wrenches">Wrenches</a>
                    </li>
                </ul>
            </nav>
            <nav>
                <ul>
                    <li>
                        <a href="checkout.php" title="Checkout">Checkout</a>
                    </li>
                    <li>
                        <a href="logout.php" title="Logout">Logout</a>
                    </li>
                </ul>
            </nav>
        </header>
        <main>
            <header>
                <h1>Checkout</h1>
            </header>
            <section>
                <?php printCart(); ?>
            </section>
            <section>
                <h2>Want to start over?</h2>
                <a href="clearCart.php">Clear Cart</a>

                <h2>Checkout</h2>
                <a href="#">Complete Purchase</a>
            </section>
        </main>
    </body>
</html>