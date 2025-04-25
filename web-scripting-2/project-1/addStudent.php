<?php

// show a form for adding a stuent

// link to php submission page that sanitizes and adds the student

session_start();

include_once 'functions.php';

if (!isLogged()) {
    send('login.php?error=not_logged');
}

include_once 'html/head.html';
include_once 'html/header.html';

if (isset($_GET['error'])) {
    include_once 'db_conn.php';
    $error = $conn->real_escape_string(cleanString($_GET['error']));
    $string = '';
    switch ($error) {
        case 'missing_info':
        case 'empty_values':
            $string .= 'The information you submitted was not complete.';
            break;
        case 'not_string':
            $string .= 'The information you submitted was not in the expected format.';
            break;
        case 'query_execution_failed':
            $string .= 'There was a server error. Please try again.';
            break;
    }
    $conn->close();
}

?>


<header>
    <h1>Add a Student</h1>
</header>
<section>
    <form action="submitAddStudent.php" method="POST">

    <div>
        <label for="studentNumber">Student Number:</label>
        <input type="text" name="studentNumber" id="studentNumber" placeholder="Student Number" pattern="^[aA]0[0-9]{7}$" required>
    </div>

    <div>
        <label for="firstName">First Name:</label>
        <input type="text" name="firstName" id="firstName" placeholder="First Name" required>
    </div>

        <div>
        <label for="lastName">Last Name:</label>
        <input type="text" name="lastName" id="lastName" placeholder="Last Name" required>
    </div>

    <input type="submit" value="Submit">

    </form>
</section>