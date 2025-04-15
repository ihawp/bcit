<?php


session_start();
session_regenerate_id(true);

include 'db_conn.php';
include 'functions.php';

if (!isLogged()) {
    sendHome('error=not_logged_in');
}

include 'head.html';
include 'header.html';

echo '<section>';

makeHello();

echo '</section>';

if (isset($_POST['student-number']) && isset($_POST['first-name']) && isset($_POST['last-name']) && $_POST['student-number'] === '' && $_POST['first-name'] === '' && $_POST['last-name'] === '') {
    header('Location: searchStudents.php?error=no_input');
    exit();
}

if (isset($_GET['error'])) {
    $error = cleanString($_GET['error']);
    switch ($error) {
        case 'no_input':
            echo '<p>You did not provide any input.</p>';
            break;
    }
}

// dynamic query

$query = "SELECT * FROM users WHERE 1=1";
$types = "";
$values = [];
$conditions = [];

if (isset($_POST['student-number']) && $_POST['student-number'] !== '') {
    $studentNumber = cleanString($_POST['student-number']);
    if (preg_match('/^a0[0-9]{7}$/i', $studentNumber)) {
        $conditions[] = "student_number LIKE ?";
        $types .= "s";
        $values[] = "%".$_POST['student-number']."%";
    }
}

if (isset($_POST['first-name']) && $_POST['first-name'] !== '') {
    $conditions[] = "firstname LIKE ?";
    $types .= "s";
    $values[] = "%".$_POST['first-name']."%";
}

if (isset($_POST['last-name']) && $_POST['last-name'] !== '') {
    $conditions[] = "lastname LIKE ?";
    $types .= "s";
    $values[] = "%".$_POST['last-name']."%";
}

if ($types !== '') {

    if (!empty($conditions)) {
        $query .= " AND (" . implode(" OR ", $conditions) . ")";
    }

    $st = $conn->prepare($query);

    if (!empty($values)) {
        $st->bind_param($types, ...$values);
    }

    $st->execute();

    $result = $st->get_result();

    $queryResultCount = $result->num_rows;

    echo '<section>';

    echo '<p>Your search returned '.$queryResultCount.' result(s)!</p>';

    if ($queryResultCount > 0) {
        makeTable($result);
    } else {
        echo '<section><p>Record not found.</p></section>';
    }

    echo '</section>';

}

?>

<section>
    <h2>Make a search!</h2>
    <form action="searchStudents.php" method="POST">
        <label for="student-number">Student Number (A0XXXXXXX):</label>
        <input type="text" name="student-number" id="student-number" pattern="^[aA]0[0-9]{7}$" placeholder="Student Number">

        <label for="first-name">First Name:</label>
        <input type="text" name="first-name" id="first-name" placeholder="First Name">

        <label for="last-name">Last Name:</label>
        <input type="text" name="last-name" id="last-name" placeholder="Last Name">

        <input type="submit" value="Search">
    </form>
</section>

<?php

include 'footer.html';