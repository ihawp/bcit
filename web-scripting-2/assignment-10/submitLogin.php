<?php

session_start();
session_regenerate_id(delete_old_session: true);

include 'db_conn.php';
include 'functions.php';

if (!isset($_POST['username']) && !isset($_POST['password'])) {
    sendHome('error=isset');
}

// do operations on data (check against database)


$username = cleanString($_POST['username']);

$query = $conn->prepare('SELECT * FROM users WHERE username = ?');

$query->bind_param('s', $username);

$query->execute();

$result = $query->get_result();

if ($result->num_rows > 0) {
    // user exists (check against password)
    while ($row = $result->fetch_assoc()) {

        // POST password since account exists.
        $password = $_POST['password'];

        // Check password against retrieved password
        // If the password were to be hashed I would use password_verify(); to verify the password input
        if ($password === $row['password']) {
            $_SESSION['id'] = $row['id'];
            $_SESSION['username'] = formatString($row['username']);
            header('Location: allStudents.php');
        } else {
            sendHome('error=password');
        }
    }
} else {
    sendHome('error=username');
}