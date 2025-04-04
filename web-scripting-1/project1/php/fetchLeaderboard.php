<?php


include('db_conn.php');

if ($result = $conn -> query("SELECT * FROM leaderboard ORDER BY `enemies_defeated` DESC LIMIT 25")) {
    
    $data = [];

    while ($row = $result -> fetch_assoc()) {
        array_push($data, $row);
    }

    echo json_encode($data);
}

$result->close();
$conn->close();