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