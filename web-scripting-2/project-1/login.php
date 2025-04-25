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
    <h1>Login</h1>
</header>
<?php

if (isset($_GET['error'])) {

    include_once 'db_conn.php';

    $error = $conn->real_escape_string(cleanString($_GET['error']));

    $string = '<p class="error">';

    switch ($error) {
        case 'not_string':
            $string .= 'There was an error in the information you submitted.';
            break;
        case 'query_failed':
            $string .= 'Sorry! There was a server error. Please try again.';
            break;
        case 'account_doesnt_exist':
            $string .= 'Account does not exist.';
            break;
        case 'not_logged':
            $string .= 'Please login before accessing that content.';
            break;
    }

    $string .= '</p>';

    echo $string;

    $conn->close();

}

?>
<section>
    <form action="submitLogin.php" method="POST">
                    
        <div>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" placeholder="Username" minlength="3" maxlength="16" required>
        </div>

        <div>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Password" required>
        </div>

        <input type="submit" value="Submit">

    </form>
</section>
<?php

include_once 'html/footer.html';