<?php
function cleanString($string): string {
    return stripslashes(trim(htmlspecialchars($string)));
}

function formatString($string) {
    return ucfirst(strtolower($string));
}

function checkExistence($string): int {
    if (isset($_POST[$string]) && !empty($_POST[$string])) {
        return 1;
    }
    return 0;
}