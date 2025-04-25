<?php

include_once 'html/head.html';
include_once 'html/NL-header.html';

session_start();

include_once 'functions.php';

if (isLogged()) {
    send('index.php');
}

?>

<header>
    <h1>Register</h1>
</header>
<?php

if (isset($_GET['error'])) {
    include_once 'db_conn.php';
    $error = $conn->real_escape_string(cleanString($_GET['error']));

    $string = '<p class="error">';

    switch ($string) {
        case 'missing_information':
            $string .= 'The information you submitted was not complete.';
            break;
        case 'not_valid_student_number':
            $string .= 'You did not submit a valid student number.';
            break;
        case 'not_string':
            $string .= 'The information you submitted did not match the expected format.';
            break;
        case 'empty_fields':
            $string .= 'Some fields were left empty.';
            break;
        case 'query_failed':
            $string .= 'There was a server error. Please try again.';
            break;
        case 'account_already_exists':
            $string .= 'There is already an account with the username submitted.';
            break;
    }

    $string .= '</p>';
}

?>
<section>
    <form action="submitRegister.php" method="POST">
        
        <div>
            <label for="firstName">First Name:</label>
            <input type="text" name="firstName" id="firstName" placeholder="First Name" required>
        </div>
        
        <div>
            <label for="lastName">Last Name:</label>
            <input type="text" name="lastName" id="lastName" placeholder="Last Name" required>
        </div>

        <div>
            <label for="username">Username:</label>
            <input type="text" name="username" id="username" placeholder="Username" required>
        </div>

        <div>
            <label for="studentNumber">Student Number:</label>
            <input type="text" name="studentNumber" id="studentNumber" placeholder="Student Number" pattern="^[aA]0[0-9]{7}$" required>
        </div>

        <div>
            <label for="password">Password:</label>
            <input type="password" name="password" id="password" placeholder="Password" required>
        </div>

        <input type="submit" value="Submit">

    </form>
</section>

<?php

include_once 'html/footer.html';