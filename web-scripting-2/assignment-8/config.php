<?php
/*
this page is for storing application wide configuration values
other scripts can require_once() this file if they need access to this data
*/

/*
timeout duration
----------------
the number of seconds to allow between requests
log user out if they exceed this timeout

//one hour
  const TIMEOUT_IN_SECONDS = 3600 
//change to a lower value for testing, eg:
  const TIMEOUT_IN_SECONDS = 3;
*/
const TIMEOUT_IN_SECONDS = 5;


/*
login credentials
-----------------
when assessing user provided form data...

any of the REGISTERED_USERS should be accepted
matches should be case sensitive
(add your own name if you like!)

all users will be expected to use the SECRET_PASSWORD
a match should be case sensitive
*/
const REGISTERED_USERS  = array("shania", "shane", "sheri", "shawn", "joe");
const SECRET_PASSWORD   = "bcit";


/*
valid product categories
------------------------
the product categories for the shopping cart
use the items from this array to verify that 
the form processins and shopping cart session values 
never deal with anything but valid choices
*/
const PRODUCT_LIST = array("gears", "brushes", "wrenches");

?>