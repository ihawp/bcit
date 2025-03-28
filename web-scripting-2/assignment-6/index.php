<!DOCTYPE html>
<html lang="en">
<head>
    <title>Assignment06 - PHP FWD Web Scripting 2</title>  
    
    <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png">
        
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
    <meta name="description" content="BCIT FWD Web Scripting 2: Using PHP and MySQL to develop server side solutions for web development.">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">    
    <meta charset="UTF-8">    
    

	<!-- stylesheets related to the jQuery lightbox -->
	<link rel="stylesheet" href="css/lightbox.css">
    <link rel="stylesheet" href="css/styles.css">    

    <!-- load the jQuery and lightbox scripts... -->
    <script src="js/jquery-1.11.0.min.js" defer></script>
    <script src="js/lightbox.js" defer></script>
</head>
<body>
<div id="wrapper">
    <header>
        <h1>Home - Assignment06</h1>
    </header>

	<nav>		
		<ul>
            <li><a href="index.php?type=home">Home</a></li>                        
            <?php

                // Dynamically build navbar
                $q = scandir("galleries");
                for ($i = 2; $i < count($q); $i++) {
                    echo '<li><a href="index.php?type='.$q[$i].'">'.ucfirst($q[$i]).'</a></li>';
                }

            ?>
		</ul>
	</nav>
    <main>             
    <section>

        <?php

            // Include functions.php to obtain required functions
            include("functions.php");

            
            // Check if ?type= is set (and set $default to value of ?type= if so)
            $default = '';
            if (isset($_GET['type'])) {
                $default = stripslashes(trim(htmlspecialchars($_GET['type'])));
            }

            switch ($default) {
                case 'kittens':
                case 'landscapes':
                case 'places':
                    displayGallery('/'.$default);
                    break;
                default:
                    displayHome();
                    break;
            }

            ?>

    </section>        
    </main>
    <footer>
        <p>Copyleft 20** <span>&copy;</span> - PHP FWD Web Scripting 2</p>
    </footer>
</div>    
</body>
</html>