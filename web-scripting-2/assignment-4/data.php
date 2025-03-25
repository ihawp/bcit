<?php
/*
the data on this page should be used by the TWD PHP Lab #4 script.

be sure to include this file in any of your script(s)
that need access to the values defined here

ensure that all the variables defined in 
this page are utilized in order to demonstrate how
your functions perform with both valid as well as invalid data

eg: if your name formatting function is named 
	nameFormatter( )
then invoke it several times, once for each test name...
echo "<p>Hello, ".formatName($fullname01)."!</p>";
echo "<p>Hello, ".formatName($fullname02)."!</p>";
echo "<p>Hello, ".formatName($fullname03)."!</p>";
	
	etc...

use an iterative loop to invoke your function
on each item from an array like $customerNames

*/


//use this value as whenever PHP
//needs access to the user's name 
//you can change it's value if you like
$userName = "Warren";


/*
-------------------------------------
1 - special day handling
-------------------------------------
*/
//the items in this array must include
//associated CSS styles in special-days.css
//the CSS should use the array string index as the .classname
const SPECIAL_DAYS = [ 	array('birthday'=>'February 3'),						
						array('halloween'=>'October 31'), 
						array('christmas'=>'December 25'), ];


/*
-------------------------------------
2 - name formatting data
-------------------------------------
*/
//use this constant if your script
//or functions need to know the minimum 
//length of a formattable name
const MIN_USERNAME_LENGTH = 2;

//if name is invalid,
//use this default instead
const DEFAULT_USER_NAME = "Friend";

//usernames to be formatted later
//change the $fullname03 value to match your full name 
$fullname01 	= "JOe sCHmoE";
$fullname02 	= "shania someperson";
$fullname03 	= "jiMMIny CrickeT";

//some examples of invalid names
//use each of these to demonstrate function
//error handling and parameter validation
$notfullname01 	= false;
$notfullname02 	= 123;
$notfullname03 	= "";

//some arrays of names
//a fully valid array
$customerNames01	= array("LarrY Scary","Jane Plain","gordon heavyfoot");
//a partially valid array
$customerNames02	= array("JANET PLANeT","SaraH vaughan", false, "Anne Droid", -34, "", "JerIMiah JonES");



/*
-------------------------------------
3 - some arrays containing hyperlink data
-------------------------------------
*/
//first a few valid arrays...
$phpLinks = array("https://www.php.net/",
		"https://www.php.net/manual/en/function.is-string.php",
		"https://www.php.net/manual/en/function.is-bool.php",
		"https://www.php.net/manual/en/function.is-array.php",
		"https://www.php.net/manual/en/function.is-int.php",
		"https://www.php.net/manual/en/function.is-numeric.php");
		
$bcitLinks  = array("https://www.bcit.ca",
		"https://my.bcit.ca",
		"https://learn.bcit.ca", 
		"https://www.bcit.ca/programs/front-end-web-developer-certificate-full-time-distance-and-online-learning-6535cert/");		

$webDevLinks  = array("MDN"=>"https://developer.mozilla.org/en-US/",
					  "W3C"=>"https://w3.org",
					  "VCS"=>"https://github.com/",					 
					  "ECMA"=>"https://www.ecma-international.org/");	
		
//a partially valid array
$moreLinksWithJunk = array("https://www.google.ca",
		true,
		"https://bing.com",
		123,
		"     ",
		null,
		"https://duckduckgo.com/");		
		
//some examples of invalid arrays
//use each of these to demonstrate function
//error handling and parameter validation		
$notanarray01 = true;
$notanarray02 = -13;
$notanarray03 = "Shania";
//actually, $notanarray04 IS an array, but it is empty 
$notanarray04 = array();	
		


?>