<?php

include_once 'functions.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send('login.php');
}

if (!isset($_POST['username']) || !isset($_POST['password'])) {
    send('login.php?error=missing_fields');
}

$username = cleanString($_POST['username']);
$password = $_POST['password'];

if (!is_string($username) || !is_string($password)) {
    send('login.php?error=not_string');
}

include_once 'db_conn.php';

$query = $conn->prepare('SELECT id, username, student_number, password FROM users WHERE username = ?');

$query->bind_param('s', $username);

if (!$query->execute()) {
    send('login.php?error=query_failed');
}

$result = $query->get_result();

if ($result->num_rows === 0) {
    send('login.php?error=account_doesnt_exist');
}

while ($row = $result->fetch_assoc()) {

    if (!password_verify($password, $row['password'])) {
        send('login.php?error=wrong_password');
    }

    session_start();

    $_SESSION['id'] = $row['id'];
    $_SESSION['username'] = $row['username'];
    $_SESSION['student_number'] = $row['student_number'];

    send('index.php');
}