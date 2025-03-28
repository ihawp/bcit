<?php
//all folders in this 'galleries/' directory
//will be treated as photo galleries
//eg: we expect there to be images inside them
const GALLERIES_DIRECTORY   = "galleries/";

//a collection of mime types we can use as images on the web
const IMAGE_MIME_TYPES      = array("image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp");


//Public API: https://dog.ceo/dog-api/
//select a public API, this one selects a random dog image :) 
//see the website for details ont he JSON format: https://dog.ceo/dog-api/
const API_PATH = "https://dog.ceo/api/breeds/image/random";


?>