<?php

include('db_conn.php');
include('functions.php');

$input = file_get_contents('php://input');

$data = json_decode($input, true);

if (isset($data['username']) && isset($data['enemiesDefeated']) && isset($data['roundLost']) && $_SERVER['REQUEST_METHOD'] === 'POST') {

    $username = clean($data['username']);
    $enemiesDefeated = clean($data['enemiesDefeated']);
    $roundLost = clean($data['roundLost']);
    $stringRegex = '/^[A-Za-z]+$/';
    $intRegex = '/^[0-9]+$/';

    if (($roundLost + 1) * 100 > $enemiesDefeated && preg_match($stringRegex, $username) && preg_match($intRegex, $enemiesDefeated) && preg_match($intRegex, $enemiesDefeated) && is_string($username) && is_numeric($enemiesDefeated) && is_numeric($roundLost)) {
    
        $query = $conn->prepare("INSERT INTO `leaderboard` (`username`, `enemies_defeated`, `round_lost`) VALUES (?, ?, ?)");
        $query->bind_param('sii', $username, $enemiesDefeated, $roundLost);
        $query->execute();

        echo json_encode(['success' => true]);

    } else {
        header('Location: ../index.html');
        echo json_encode(['error' => true]);
    }
} else {
    header('Location: ../index.html');
    echo json_encode(['error' => true]);
}

$query->close();
$conn->close();