<?php

session_start();

include_once 'functions.php';

if (!isLogged()) {
    send('login.php');
}

include_once 'html/head.html';
include_once 'html/header.html';

?>

<header>
    <h1>Home</h1>
</header>
<section>
    <p>Use the navigation bar to find the website content!</p>
</section>

<?php

include_once 'html/footer.html';

?>