<?php

/* ---- UPDATE THE FOLLOWING VALUES TO MATCH YOUR SERVER FOLDER STRUCTURE----- */

/*
this file contains some CONSTANTS and $variables
that should be used by your script when 
application specific paths are need.
You may add additional variables and CONSTANTS as you deem neccessary

NOTE: you will need to update the values of this variable:
    $fullPathToFile (it's on line 30 below!)
so that it reflects the actual loaction of the scripts on your localhost server    
eg $_SERVER['DOCUMENT_ROOT'] will provide the path to the htdocs server root,
then add whatever additional folders as needed

for example, if the following path is used:
    $fullPathToFile       =  $_SERVER['DOCUMENT_ROOT'] . "/session09/assignment09/";
it will result in some thing like
    C:/MAMP/htdocs/sessiob09/assignment09/    
or on MAC OS    
    Applications/MAMP/htdocs/session09/assignment09/    
*/




//imagick will need a full path to read or write images
//use this only when reading or writing an Imagick Image
$fullPathToFile       =  $_SERVER['DOCUMENT_ROOT'] . "/assignment09/uploads";


//some variables for important folder and file locations
$directory_zip_uploads 		    = "_zip_uploads/";
$directory_extracted_files 	    = "_extracted_images/";
$directory_watermarked_images   = "_watermarked_images/";
$directory_zip_downloads    	= "_zip_downloads/";

//the watermark image to be used
$watermark_image	 			= "watermark.png";

//an array of acceptable file types
//use mime_content_type() to determine
//if uploaded files are ok to use as images
//by seeing if the uploaded file is in this array
$web_image_formats = array("image/jpeg","image/jpg","image/gif","image/png", "image/webp", "image/svg") ;

?>