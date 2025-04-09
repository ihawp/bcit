<?php

include('db_conn.php');
include('functions.php');

$input = file_get_contents('php://input');

$data = json_decode($input, true);



if (isset($data['username']) && isset($data['enemiesDefeated']) && isset($data['roundLost']) && $_SERVER['REQUEST_METHOD'] === 'POST') {

    $username = clean($data['username']);
    // Credit: https://www.cs.cmu.edu/~biglou/resources/bad-words.txt for bad_words.txt
    $badWords = file_get_contents('bad_words.txt');
    if (strpos($badWords, $username)) {
        echo json_encode(['error' => 'Inappropriate Username.']);
        exit();
    }
    $enemiesDefeated = clean($data['enemiesDefeated']);
    $roundLost = clean($data['roundLost']);
    $stringRegex = '/^[A-Za-z]+$/';
    $intRegex = '/^[0-9]+$/';

    if (($roundLost + 1) * 100 > $enemiesDefeated && preg_match($stringRegex, $username) && preg_match($intRegex, $enemiesDefeated) && preg_match($intRegex, $enemiesDefeated) && is_string($username) && is_numeric($enemiesDefeated) && is_numeric($roundLost)) {
    
        $query = $conn->prepare("INSERT INTO `leaderboard` (`username`, `enemies_defeated`, `round_lost`) VALUES (?, ?, ?)");
        $query->bind_param('sii', $username, $enemiesDefeated, $roundLost);
        $query->execute();

        echo json_encode(['success' => 'Leaderboard Updated!']);

    } else {
        header('Location: ../index.html');
        echo json_encode(['error' => 'Not Possible']);
    }
} else {
    header('Location: ../index.html');
    echo json_encode(['error' => 'Hmmm']);
}

$query->close();
$conn->close();