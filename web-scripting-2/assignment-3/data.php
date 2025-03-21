<?php

/*
-------------------------------------------------------
VARIABLES
-------------------------------------------------------
*/
/*
For part A
$targetName stores the name to search for
change the value of $targetName
to test the performance of this script

test different casing here!!

make this a weird cased version 
of your name instead of "shaNIa"s name
*/
$targetName = "WArrEN";

/*
$students 
stores an array of mixed case student names to search through
*/
$students = array("MiCKeY", "JonES", "WarrEn", "Sherri","Bob","JANE","Sarah","sHAun","Bart", "jeff", "MAGGIE");


/*
For part B

*/
$cardImageDirectory = "./images/cards/";
$cardsPerHand       = 5;
$cardImages         = array("ace_of_clubs.svg", "2_of_clubs.svg", "3_of_clubs.svg", "4_of_clubs.svg", "5_of_clubs.svg", "6_of_clubs.svg", "7_of_clubs.svg", "8_of_clubs.svg", "9_of_clubs.svg", "10_of_clubs.svg", "jack_of_clubs.svg", "queen_of_clubs.svg", "king_of_clubs.svg", "ace_of_hearts.svg", "2_of_hearts.svg", "3_of_hearts.svg", "4_of_hearts.svg", "5_of_hearts.svg", "6_of_hearts.svg", "7_of_hearts.svg", "8_of_hearts.svg", "9_of_hearts.svg", "10_of_hearts.svg", "jack_of_hearts.svg", "queen_of_hearts.svg", "king_of_hearts.svg", "ace_of_spades.svg", "2_of_spades.svg", "3_of_spades.svg", "4_of_spades.svg", "5_of_spades.svg", "6_of_spades.svg", "7_of_spades.svg", "8_of_spades.svg", "9_of_spades.svg", "10_of_spades.svg", "jack_of_spades.svg", "queen_of_spades.svg", "king_of_spades.svg", "ace_of_diamonds.svg", "2_of_diamonds.svg", "3_of_diamonds.svg", "4_of_diamonds.svg", "5_of_diamonds.svg", "6_of_diamonds.svg", "7_of_diamonds.svg", "8_of_diamonds.svg", "9_of_diamonds.svg", "10_of_diamonds.svg", "jack_of_diamonds.svg", "queen_of_diamonds.svg", "king_of_diamonds.svg");


/*
For part C
$capitalCities is an associative array defining the capital cities of various European countries
also, Canada. Feel free to add your own country of origin if its not in the array yet
*/
$capitalCities = array( "Mexico" => "Mexico City", "Canada"=>"Ottawa", "Belgium"=> "Brussels", "Denmark"=>"Copenhagen", "Finland"=>"Helsinki", "France" => "Paris", "Slovakia"=>"Bratislava", "Slovenia"=>"Ljubljana", "Germany" => "Berlin", "Greece" => "Athens", "Ireland"=>"Dublin", "Italy"=>"Rome", "Netherlands"=>"Amsterdam", "Portugal"=>"Lisbon", "Spain"=>"Madrid", "Sweden"=>"Stockholm", "United Kingdom"=>"London", "Cyprus"=>"Nicosia", "Lithuania"=>"Vilnius", "Czech Republic"=>"Prague", "Estonia"=>"Tallin", "Hungary"=>"Budapest", "Latvia"=>"Riga", "Malta"=>"Valetta", "Austria" => "Vienna", "Poland"=>"Warsaw", "Ukraine"=>"Kiev") ;

/*
For part D
for each of the numbers in this array, 
all numbers from that number to zero
(count up if number is negative,
 count down if number is positive,
 dont count anything if number is already zero)
*/
$collectionOfNumbers = array(4, -2, 0, 3,6, 7);
?>