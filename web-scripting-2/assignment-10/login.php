<?php


// one hour long session (login)

// validate when submitted

// check against the database

// if in database and correct then say great!

// if not do not allow to view search.php

session_start();
session_regenerate_id(true);

include 'functions.php';

if (isLogged()) {
    header('Location: allStudents.php');
}


include 'head.html';
include 'header-not-logged.html';

?>

<section><?php

if (isset($_GET['error'])) {
    $error = cleanString($_GET['error']);
    switch ($error) {
        case 'username':
            makeError('You did not input the correct username.');
            break;
        case 'password':
            makeError('You did not input the correct password.');
            break;
    }
}

?></section>

<section>
    <form action="submitLogin.php" method="POST">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" placeholder="Username">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="Password">
        <input type="submit" value="button">
    </form>
</section>


<?php

include 'footer.html';