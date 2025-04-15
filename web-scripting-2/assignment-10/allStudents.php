<?php

session_start();
session_regenerate_id(delete_old_session: true);

include 'db_conn.php';
include 'functions.php';


if (!isLogged()) {
    sendHome('error=not_logged_in');
}

include 'head.html';
include 'header.html';

echo '<section>';

makeHello();

echo '</section>';

echo '<section>';
// fetch some content

$query = $conn->prepare('SELECT * FROM users');

$query->execute();

$result = $query->get_result();

$resultCount = $result->num_rows;

echo '<p>There are '.$resultCount.' students.';

if ($resultCount > 0) {
    makeTable($result);
} ?>

<?php
echo '</section>';

include 'footer.html';