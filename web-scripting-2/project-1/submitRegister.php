<?php

include_once 'functions.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send('register.php');
}

if (!isset($_POST['username']) || !isset($_POST['password']) || !isset($_POST['studentNumber']) || !isset($_POST['firstName']) || !isset($_POST['lastName'])) {
    send('register.php?error=missing_information');
}

include_once 'db_conn.php';

$username = $conn->real_escape_string(cleanString($_POST['username']));
$studentNumber = $conn->real_escape_string(cleanString($_POST['studentNumber']));
$firstName = $conn->real_escape_string(cleanString($_POST['firstName']));
$lastName = $conn->real_escape_string(cleanString($_POST['lastName']));
$password = $_POST['password'];

if (!preg_match('/^a0[0-9]{7}$/i', $studentNumber)) {
    send('register.php?error=not_valid_student_number');
}

if (!is_string($studentNumber) || !is_string($username) || !is_string($password)) {
    send('register.php?error=not_string');
}

if (empty($studentNumber) || empty($username) || empty($password)) {
    send('register.php?error=empty_fields');
}

// Check if username or student numbers exists.
$query = $conn->prepare('SELECT * FROM users WHERE username = ? OR student_number = ?');

$query->bind_param('ss', $username, $studentNumber);

if (!$query->execute()) {
    send('register.php?error=query_failed');
}

$result = $query->get_result();

if ($result->num_rows > 0) {
    send('register.php?error=account_already_exists');
}


$query = $conn->prepare('INSERT INTO users (`username`, `password`, `student_number`, `firstname`, `lastname`) VALUES (?, ?, ?, ?, ?)');

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$query->bind_param('sssss', $username, $hashedPassword, $studentNumber, $firstName, $lastName);

if (!$query->execute()) {
    send('register.php?error=query_failed');
}

session_start();

$_SESSION['id'] = $query->insert_id;
$_SESSION['username'] = $username;
$_SESSION['student_number'] = $studentNumber;

$query->close();
$conn->close();

send('index.php');