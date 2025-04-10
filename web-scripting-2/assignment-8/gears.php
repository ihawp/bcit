<?php

session_start();

include 'functions.php';

if (!isLogged()) {
    header('Location: login.php');
    exit();
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
                <h1>Gears</h1>
            </header>
            <section>
                <?php

                    printItemsAdded();

                    printCart();

                ?>
            </section>
            <section>
                <h2>Great Gears</h2>
                <form action="add_to_cart.php" method="POST">
                    <input name="type" value="gears" hidden aria-hidden="true">
                    <div>
                        <label for="quantity">Gears: </label>
                        <select name="quantity" id="quantity">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                        </select>
                    </div>
                    <button type="submit">Add To Cart</button>
                </form>
            </section>
        </main>
    </body>
</html>