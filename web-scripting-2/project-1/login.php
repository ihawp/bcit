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
            <section>
                <form action="submitLogin.php" method="POST">
                    
                    <div>
                        <label for="username">Username:</label>
                        <input type="text" id="username" name="username" minlength="3" maxlength="16" required>
                    </div>

                    <div>
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required>
                    </div>

                    <input type="submit" value="Submit">

                </form>
            </section>
<?php

include_once 'html/footer.html';