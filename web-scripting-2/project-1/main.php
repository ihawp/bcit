<?php

// Start the $_SESSION (access)
session_start();

// Include potentially required functions (2 for pages requiring login)
include_once 'functions.php';

// Use functions from functions.php to determine if the user is logged
// if they are not they will be sent to the login.php page
if (!isLogged()) {
    send('login.php?not_logged_in');
}

// Include some head/header content for page construction
include_once 'html/head.html';
include_once 'html/header.html';

?>

<header>
    <h1>All Students</h1>
    <p>Feel free to update the database as you please!</p>
</header>

<?php

// Include $conn here
// Potentially used by error or success for real_escape_string
// Guaranteed to be used once past error/success for query
include_once 'db_conn.php';

if (isset($_GET['error'])) {

    echo '<section>';

    $error = $conn->real_escape_string(cleanString($_GET['error']));

    $string = '<p class="error">';

    switch ($error) {
        case 'missing_values':
        case 'empty_fields':
            $string .= 'The information you submitted was incomplete.';
            break;
        case 'not_a_string':
            $string .= 'The information you submitted was not in the expected format.';
            break;
        case 'preg_match':
            $string .= 'The Student Number that you submitted was not in the proper format.';
            break;
        case 'query_execution_failed':
            $string .= 'There was a server error. Please try again.';
            break;
        case 'student_number_exists':
            $string .= 'The student number you attempted to submit already exists in the user list.';
            break;
        case 'student_number_doesnt_exist':
            $string .= 'The student number you attempted to update does not exist in the user list.';
            break;
    }

    $string .= '</p>';

    echo $string;

    echo '</section>';

}

if (isset($_GET['success'])) {

    $success = $conn->real_escape_string(cleanString($_GET['success']));

    $string = '<p class="success">';
    // turn into function that returns proper printing message for server success (or error (aswell)) message
    switch ($success) {
        case 'record_updated':
            $string .= 'The record was updated successfully!';
            break;
        case 'deleted':
            $string .= 'The record was deleted successfully!';
            break;
    }

    $string .= '</p>';

    echo '<section>';

    echo $string;

    echo '</section>';

}

$query = $conn->prepare('SELECT * FROM users LIMIT 25');

if (!$query->execute()) {
    echo '<p>There was an error loading the content.</p>';
    exit();
}

$result = $query->get_result();

if ($result->num_rows === 0) {
    echo '<p>There are no users in the database</p>';
    exit();
}

?>

<section>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Update</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>

<?php

while ($row = $result->fetch_assoc()) {

    echo '<tr>';

    echo '<td>'.uppercfirst($row['student_number']).'</td>';

    echo '<td>'.uppercfirst($row['firstname']).'</td>';

    echo '<td>'.uppercfirst($row['lastname']).'</td>';

    echo '<td><a href="updateRecord.php?firstName='.$row['firstname'].'&lastName='.$row['lastname'].'&studentNumber='.$row['student_number'].'" title="Update">Update</a></td>';

    echo '<td><a href="deleteConfirm.php?firstName='.$row['firstname'].'&lastName='.$row['lastname'].'&studentNumber='.$row['student_number'].'" title="Delete">Delete</a></td>';

}

?>
        </tbody>
    </table>
</section>