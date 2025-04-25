<?php

session_start();

include_once 'functions.php';

if (!isLogged()) {
    send('login.php?not_logged_in');
}


include_once 'html/head.html';
include_once 'html/header.html';

?>

<header>
    <h1>All Students</h1>
    <p>Feel free to update the database as you please!</p>
</header>

<?php

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

    echo '<td>
    
            <form action="updateRecord.php" method="POST">

                <label for="firstName" hidden>First Name:</label>
                <input type="text" name="firstName" id="firstName" value="'.$row['firstname'].'" hidden>

                <label for="lastName" hidden>Last Name:</label>
                <input type="text" name="lastName" id="lastName" value="'.$row['lastname'].'" hidden>

                <label for="studentNumber" hidden>Student Number</label>
                <input type="text" name="studentNumber" id="studentNumber" value="'.$row['student_number'].'" pattern="^[aA]0[0-9]{7}$" hidden>

                <input type="submit" value="Update">
            </form>
    
    </td>';

    echo '<td>
            <form action="deleteConfirm.php" method="POST">

                <label for="firstName" hidden>First Name:</label>
                <input type="text" name="firstName" id="firstName" value="'.$row['firstname'].'" hidden>

                <label for="lastName" hidden>Last Name:</label>
                <input type="text" name="lastName" id="lastName" value="'.$row['lastname'].'" hidden>

                <label for="studentNumber" hidden>Student Number</label>
                <input type="text" name="studentNumber" id="studentNumber" value="'.$row['student_number'].'" hidden>

                <input type="submit" value="Delete">
            </form>
        </td>';

    echo '</tr>';

}


?>
        </tbody>
    </table>
</section>

<?php



/*

make and utilize to dynamically bind parameters of
prepared statement.

function makeQuery($queryString) {
    
    include_once 'db_conn.php';

    $query = $conn->prepare($queryString);


    call_user_func_array(array($query, 'bind_param'), $)

    // would have to make more dynamic function
    // for passing multiple bind params

    $query->bind_param();

}
*/