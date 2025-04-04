<?php

function clean($string) {
    return stripslashes(trim(htmlspecialchars($string)));
}