<?php ?>

<!doctype html>
<html lang="en">
    <head>
        <title>Play Breakthrough v2 | ihawp.com</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="author" content="Warren Chemerika | ihawp.com">
        <meta name="description" content="Play Breakthrough v2, the most intense WASD avoider game of all time.">
        <link rel="preload stylesheet" as="style" href="styles/styles.css">
    </head>
    <body class="leaderboard">
        <header>
            <nav aria-label="Play Breakthrough" class="nav nav-top nav-right">
                <a href="index.html" title="Play Breakthrough">Play Breakthrough</a>
            </nav>
        </header>
        <main>
            <section id="overflow"><?php

                include('php/db_conn.php');

                if ($result = $conn -> query("SELECT * FROM leaderboard ORDER BY `enemies_defeated` DESC LIMIT 25")) {
                    echo '<ul class="leaderboard">';

                    $i = 0;
                    while ($row = $result -> fetch_assoc()) {
                        $classes = 'leaderboard';
                        switch ($i) {
                            case 0:
                                $classes .= ' first';
                                break;
                            case 1:
                                $classes .= ' second';
                                break;
                            case 2:
                                $classes .= ' third';
                                break;
                        }
                        echo '<li class="'.$classes.'">';
                        ?>
                            <div class="absolute"><span class="smaller">#</span><?= $i + 1 ?></div>
                            <div class=""></div>
                            <p><?= $row['username'] ?></p>
                            <p>Enemies Defeated: <?= $row['enemies_defeated'] ?></p>
                            <p>Round Lost: <?= $row['round_lost'] ?></p>
                            <?php $date = strtotime($row['timestamp']); ?>
                            <p><?= date('F d, Y', $date) ?></p>
                        </li>
                    <?php $i++; }
                    echo '</ul>';
                    $result->close();
                }

                $conn->close();

            ?></section>
        </main>

        <script src="scripts/leaderboard.js" type="module"></script>

    </body>
</html>