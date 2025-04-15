<?php
function sendHome($string) {
    header('Location: login.php?'.$string);
    exit();
}

function cleanString($string) {
    return stripcslashes(trim(htmlspecialchars($string)));
}

function isLogged() {
    return isset($_SESSION['id']);
}

function makeTable($result) { ?>
    <table>
        <thead>
            <tr>
                <th>Student Number</th>
                <th>Last Name</th>
                <th>First Name</th>
            </tr>
        </thead>
        <tbody>
            <?php while ($row = $result->fetch_assoc()) { ?>
                <tr>
                    <td><?= $row['student_number'] ?></td>
                    <td><?= formatString($row['lastname']) ?></td>
                    <td><?= formatString($row['firstname']) ?></td>
                </tr>
            <?php } ?>
        </tbody>
        <tfoot>
        </tfoot>
    </table>
<?php }

function makeHello() {
    echo '<p>Hello '.$_SESSION['username'].'. You are authorized to view the content';
    echo '<a href="logout.php" title="logout" class="logout">Logout</a>';
}

function formatString($string) {
    return ucfirst(strtolower($string));
}

function makeError($message) { ?>
    <div class="error">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
        <p>Error: <?= $message ?></p>
    </div>
<?php }