<?php

// submit the student form

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

if (!preg_match('/^a0[0-9]{7}$/i', $studentNumber)) {
    send('allStudents.php?error=not_valid_student_number');
}

// check if student number already exists
$query = $conn->prepare('SELECT id FROM users WHERE student_number = ?');

$query->bind_param('s', $studentNumber);

if (!$query->execute()) {
    send('allStudents.php?error=query_execution_error');
}

$result = $query->get_result();

if ($result->num_rows > 0) {
    send('allStudents.php?error=student_number_exists');
}

$query->close();

$query = $conn->prepare('INSERT INTO users (student_number, firstname, lastname) VALUES (?, ?, ?)');

$query->bind_param('sss', $studentNumber, $firstName, $lastName);

if (!$query->execute()) {
    send('allStudents.php?error=query_execution_failed');
}

send('allStudents.php?success=student_added');