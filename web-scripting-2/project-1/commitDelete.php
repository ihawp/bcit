<?php


// commit the delete

// check the items for proper string sanitization and blah blah blah

session_start();

include_once 'functions.php';

if (!isLogged()) {
    send('login.php?error=not_logged');
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send('index.php');
}

if (!isset($_POST['studentNumber']) || !isset($_POST['firstName']) || !isset($_POST['lastName'])) {
    send('allStudents.php?error=missing_values');
}

include_once 'db_conn.php';

$studentNumber = $conn->real_escape_string(cleanString($_POST['studentNumber']));
$firstName = $conn->real_escape_string(cleanString($_POST['firstName']));
$lastName = $conn->real_escape_string(cleanString($_POST['lastName']));

if (!is_string($studentNumber) || !is_string($firstName) || !is_string($lastName)) {
    send('allStudents.php?error=not_a_string');
}

if (empty($studentNumber) || empty($firstName) || empty($lastName)) {
    send('allStudents.php?error=empty_fields');
}

$query = $conn->prepare('DELETE FROM users WHERE student_number = ? LIMIT 1');

$query->bind_param('s', $studentNumber);

if (!$query->execute()) {
    send('allStudents.php?error=query_execution_failed');
}

// mustve been deleted, send user away with success notifier for allStudents.php to deal with.

if ($studentNumber == $_SESSION['student_number']) {
    send('logout.php');
} else {
    send('allStudents.php?success=deleted&studentNumber='.$studentNumber);
}