<?php


// intakes the updated record sent from updateRecord.php

session_start();

include_once 'functions.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send('index.php');
}

if (!isLogged()) {
    send('allStudents.php?error=not_logged');
}

// Check if the expected values are set
if (!isset($_POST['originalStudentNumber']) || !isset($_POST['studentNumber']) || !isset($_POST['firstName']) || !isset($_POST['lastName'])) {
    send('allStudents.php?error=missing_values');
}

include_once 'db_conn.php';

$studentNumbers = new stdClass();
$studentNumbers->studentNumber = $conn->real_escape_string(cleanString($_POST['studentNumber']));
$studentNumbers->originalStudentNumber = $conn->real_escape_string(cleanString($_POST['originalStudentNumber']));
$firstName = $conn->real_escape_string(cleanString($_POST['firstName']));
$lastName = $conn->real_escape_string(cleanString($_POST['lastName']));


// Check if posted values are the expected type
if (!is_string($studentNumbers->originalStudentNumber) || !is_string($studentNumbers->studentNumber) || !is_string($firstName) || !is_string($lastName)) {
    send('allStudents.php?error=not_a_string');
}

// Check if strings (expected type) are empty
if (empty($studentNumbers->originalStudentNumber) || empty($studentNumbers->studentNumber) || empty($firstName) || empty($lastName)) {
    send('allStudents.php?error=empty_fields');
}

// Use regex expression to determine if studentNumbers are in the proper format
foreach ($studentNumbers as $key => $value) {
    if (!preg_match('/^a0[0-9]{7}$/i', $value)) {
        send('allStudents.php?error=preg_match');
    }
}

// check the ORIGINAL (hidden) student number for already existing in the DB

$query = $conn->prepare('SELECT id FROM users WHERE student_number = ?');

$query->bind_param('s', $studentNumbers->originalStudentNumber);

if (!$query->execute()) {
    send('allStudents.php?error=query_execution_failed');
}

$result = $query->get_result();

if ($result->num_rows === 0) {
    send('allStudents.php?error=student_number_doesnt_exist');
}

$query->close();

if ($studentNumbers->studentNumber !== $studentNumbers->originalStudentNumber) {
    // use updated* student_number from submission

    $query = $conn->prepare('SELECT id FROM users WHERE student_number = ?');

    $query->bind_param('s', $studentNumbers->studentNumber);

    if (!$query->execute()) {
        send('allStudents.php?error=query_execution_failed');
    }

    $result = $query->get_result();

    if ($result->num_rows > 0) {
        send('allStudents.php?error=student_number_exists');
    }
}

$query = $conn->prepare('UPDATE users SET student_number = ?, firstname = ?, lastname = ? WHERE student_number = ?');

$query->bind_param('ssss', $studentNumbers->studentNumber, $firstName, $lastName, $studentNumbers->originalStudentNumber);

if (!$query->execute()) {
    send('allStudents.php?error=query_execution_failed');
}

if ($studentNumbers->originalStudentNumber == $_SESSION['student_number']) {
    $_SESSION['student_number'] = $studentNumbers->studentNumber;
}

// Assume operations are complete and send back to allStudents page

send('allStudents.php?success=record_updated');