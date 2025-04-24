<?php


// intakes the updated record sent from updateRecord.php

include_once 'functions.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send('index.php');
}

// Check if the expected values are set
if (!isset($_POST['originalStudentNumber']) || !isset($_POST['studentNumber']) || !isset($_POST['firstName']) || !isset($_POST['lastName'])) {
    send('allStudents.php');
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

function dynamicQuery($query, $types, $params) {
    $bind_names[] = $types;
    foreach ($params as $key => $value) {
        $bind_names[] = &$params[$key];
    }
    return call_user_func_array([$query, 'bind_param'], $bind_names);
}

// Update User where Student Number exists.