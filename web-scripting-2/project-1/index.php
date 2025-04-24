<?php

session_start();

include_once 'functions.php';

if (!isLogged()) {
    send('login.php');
}

include_once 'html/head.html';
include_once 'html/header.html';

?>

<header>
    <h1>Home</h1>
</header>
<section>
    <p>Use the navigation bar to find the website content!</p>
</section>

<section>
    <h1>TODO:</h1>
    <ul class="pl-2 disc">
        <li>
            <p>- Error handling for all pages that send errors.</p>
            <ul class="pl-2 disc">
                <li>
                    <p>Login</p>
                </li>
                <li>
                    <p>Register</p>
                </li>
                <li>
                    <p>allStudents (from updateRecord / deleteConfirm)</p>
                </li>
                <li>
                    <p>deleteConfirm (from commitDelete)</p>
                </li>
                <li>
                    <p>updateRecord (from submitUpdateRecord) </p>
                </li>
            </ul>
        </li>
        <li>
            <p>Make sure DB connection is not initialized before it is known that it is 100% required.</p>
        </li>
    </ul>
</section>

<?php

include_once 'html/footer.html';

?>