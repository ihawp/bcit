<?php

function getMessage($userName, $specialDays): int {

    $today = date('F d');

    if (checkArray($specialDays) && checkString($userName)) {

        $found = false;

        $formattedString = formatString($userName);

        foreach ($specialDays as $specialDay) {
            foreach ($specialDay as $index => $day) {
                if ($day == $today) {
                    $found = true;
                    echo '<p class="'.$index.'">Hello, '.$formattedString.'! It is '.$today.". It's a special day: ".ucfirst($index).'</p>';
                    break 2;
                }
            }
        }
    
        if (!$found) {
            echo '<p>Hello, '.$formattedString.'. It is '.$today.". It's a typical day.</p>";
        }

        return 1; 
    
    } else { return 0; }
}

function formatName($userName): int {

    if (checkArray($userName)) {

        echo '<ul class="disc ml-1 flex flex-col gap-1">';
        foreach (array_keys($userName) as $key) {

            $currentUsername = $userName[$key];

            $printableUsername = DEFAULT_USER_NAME;

            if (checkString($currentUsername)) {
                $printableUsername = $currentUsername;
            }

            echo '<li>'.formatString($printableUsername).'</li>';


        }
        echo '</ul>';

        return 1;

    } 

    if (checkString($userName)) {

        echo '<p>Formatted Username: '.formatString($userName).'</p>';

        return 1;

    }

    return 0;

}

function buildListOfLinks($array): int {

    if (checkArray($array)) {

        echo '<ul class="disc ml-1 flex flex-col gap-1">';

        $isAssociative = false;
        
        if (checkAssociativeArray($array)) {
            $isAssociative = true;
        }

        foreach ($array as $key => $value) {

            if (checkString($value)) {
                $item = $isAssociative ? $key : $value;
                echo '<li><a href="'.$value.'" title="'.$value.'" class="c-1 ho">'.$item.'</a></li>';
            }

        }
        echo '</ul>';

        return 1;

    }

    return 0;

}

// Encapsulated Logic:

function checkString($userName): int {
    if (is_string($userName) && strlen(trim($userName)) > MIN_USERNAME_LENGTH) {
        return 1;
    }
    return 0;
}

function checkArray($array): int {
    if (is_array($array) && count($array) > 0) {
        return 1;
    }
    return 0;
}

function checkAssociativeArray($array): int {
    $checkAssociative = array_key_first($array);
    if (!empty($checkAssociative) && !is_numeric($checkAssociative)) {
        return 1;
    }
    return 0;
}

function formatString($userName): string {
    if (checkString($userName)) {
        return ucwords(strtolower($userName));
    }
    return 0;
}