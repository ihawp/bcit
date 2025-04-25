<?php

session_start();

include_once 'functions.php';

if (!isLogged()) {
    send('login.php?error=not_logged');
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send('index.php');
}

if (!isset($_POST['firstName']) || !isset($_POST['lastName']) || !isset($_POST['studentNumber'])) {
    send('allStudents.php?error=missing_values');
}

include_once 'db_conn.php';

$studentNumber = $conn->real_escape_string(cleanString($_POST['studentNumber']));

if (!preg_match('/^a0[0-9]{7}$/i', $studentNumber)) {
    send('allStudents.php?error=preg_match');
}

$firstName = $conn->real_escape_string(cleanString($_POST['firstName']));
$lastName = $conn->real_escape_string(cleanString($_POST['lastName']));

if (!is_string($studentNumber) || !is_string($firstName) || !is_string($lastName)) {
    send('allStudents.php?error=not_a_string');
}

if (empty($studentNumber) || empty($firstName) || empty($lastName)) {
    send('allStudents.php?error=empty_fields');
}

include_once 'html/head.html';
include_once 'html/header.html';

?>

<header>

</header>
<section>
    <form action="submitUpdatedRecord.php" method="POST">

        <!-- carry original student number value (expected value) -->
        <div>
            <label for="originalStudentNumber" hidden>Original Student Number:</label>
            <input type="text" name="originalStudentNumber" id="originalStudentNumber" value="<?= $studentNumber ?>" pattern="^[aA]0[0-9]{7}$" hidden required>
        </div>

        <div>
            <label for="studentNumber">Student Number:</label>
            <input type="text" id="studentNumber" name="studentNumber" placeholder="Student Number" value="<?= $studentNumber ?>" pattern="^[aA]0[0-9]{7}$" required>
        </div>
        
        <div>
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" placeholder="First Name" value="<?= $firstName ?>" required>
        </div>
        
        <div>
            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" placeholder="Last Name" value="<?= $lastName ?>" required>
        </div>

        <input type="submit" value="Submit">
    </form>
</section>


<?php

include_once 'html/footer.html';