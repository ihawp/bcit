<?php

session_start();

include_once 'functions.php';

if (!isLogged()) {
    send('login.php?not_logged_in');
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    send('index.php');
}

if (!isset($_GET['studentNumber']) || !isset($_GET['firstName']) || !isset($_GET['lastName'])) {
    send('main.php?error=missing_values');
}

include_once 'db_conn.php';

$studentNumber = $conn->real_escape_string(cleanString($_GET['studentNumber']));
$firstName = $conn->real_escape_string(cleanString($_GET['firstName']));
$lastName = $conn->real_escape_string(cleanString($_GET['lastName']));


if (!preg_match('/^a0[0-9]{7}$/i', $studentNumber)) {
    send('main.php?error=preg_match');
}

if (!is_string($studentNumber) || !is_string($firstName) || !is_string($lastName)) {
    send('main.php?error=not_a_string');
}

if (empty($studentNumber) || empty($firstName) || empty($lastName)) {
    send('main.php?error=empty_fields');
}

include_once 'html/head.html';
include_once 'html/header.html';

?>

<header>
    <h1>Delete Confirmation</h1>
</header>
<section>


    <!-- hide most of form -->
    <p>Are you sure you want to delete student <?= uppercfirst($studentNumber) ?>?</p>
    <form action="commitDelete.php" method="POST">
        
        <div>
            <label for="studentNumber" hidden>Student Number:</label>
            <input type="text" name="studentNumber" id="studentNumber" placeholder="Student Number" value="<?= $studentNumber ?>" required hidden>
        </div>

        <div>
            <label for="firstName" hidden></label>
            <input type="text" name="firstName" id="firstName" placeholder="First Name" value="<?= $firstName ?>" required hidden>
        </div>

        <div>
            <label for="lastName" hidden></label>
            <input type="text" name="lastName" id="lastName" placeholder="Last Name" value="<?= $lastName ?>" required hidden>
        </div>

        <input type="submit" value="Confirm">
        
    </form>
</section>

<?php

include_once 'html/footer.html';