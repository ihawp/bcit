<!DOCTYPE html>
<html lang="en">
<head>
    <title>Web Scripting 2 - Assignment 9</title>
    <meta charset="UTF-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta content="wope.com copied by Warren Chemerika" name="author" />
    <meta
        content="Find out what's bringing you the most search traffic with amazing features like automated keyword tagging, keyword recommendation, and smart traffic estimation tools. Try it out for 14 days with Wope - no commitment necessary!"
        name="description"
    />
    <meta content="index, follow" name="robots" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta content="Wope: The New Era of Rank Tracking" property="og:title" />
    <meta
        content="Find out what's bringing you the most search traffic with amazing features like automated keyword tagging, keyword recommendation, and smart traffic estimation tools. Try it out for 14 days with Wope - no commitment necessary!"
        property="og:description"
    />
    <meta content="summary_large_image" name="twitter:card" />
    <meta content="Wope: The New Era of Rank Tracking" name="twitter:title" />
    <meta
        content="Find out what's bringing you the most search traffic with amazing features like automated keyword tagging, keyword recommendation, and smart traffic estimation tools. Try it out for 14 days with Wope - no commitment necessary!"
        name="twitter:description"
    />
    <meta content="#0a0118" name="theme-color" />
    <meta content="IE=edge" http-equiv="X-UA-Compatible" />

    <link rel="stylesheet" href="styles/normalize-fwd.css" />
    <link rel="stylesheet" href="styles/style.css" />
    <link rel="stylesheet" href="style.css" />
    <link rel="icon" as="icon" href="images/favicon-dark.png">

</head>
<?php

session_start();
session_regenerate_id(true);
$sessionID = session_id();

include 'config.php';
include 'functions.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendHome('error=try_posting');
}

if ($_FILES['upload']['error'] > 0) {
    sendHome('error='.$_FILES['upload']['error']);
}

if ($_FILES['upload']['size'] <= 0) {
    sendHome('error=no_size');
}

if ($_FILES['upload']['size'] > 2000000) {
    sendHome('error=size_too_large');
}

if (!isset($_POST['submit'])) {
    sendHome('error=wrong_access');
}

// Create variables
$root = $_SERVER['DOCUMENT_ROOT'];
$zipUploadDir = $root."/".$directory_zip_uploads;
$extractedFilesDir = $root."/".$directory_extracted_files;
$watermarkedImagesDir = $root."/".$directory_watermarked_images;
$zipDownloadDir = $root."/".$directory_zip_downloads;

$scanZipUpload = scandir($zipUploadDir);
$targetFile = basename($_FILES["upload"]["name"]);

// Check if already file of same name
if (in_array($targetFile, $scanZipUpload)) {
    sendHome('error=file_already_exists');
}

// Move uploaded files to _zip_uploads
if (!move_uploaded_file($_FILES['upload']['tmp_name'], $zipUploadDir.$targetFile)) {
    sendHome('error=500');
}

$zip = new ZipArchive();

// Try to open the zip
if ($zip->open($zipUploadDir.$targetFile) === FALSE) {
    sendHome('error=not_zip_file');
}

// Create a direction with the NEW session_id
$extractedSessionFolder = $extractedFilesDir.$sessionID;
if (!mkdir($extractedSessionFolder)) {
    sendHome('error=500');
}

// Extract the zip to the _extracted_images folder
if ($zip->extractTo($extractedSessionFolder) === FALSE) {
    sendHome('error=extract_failed');
}

// Close zip before unlink
$zip->close();

// Unlink the zip file
if (!unlink($zipUploadDir.$targetFile)) {
    sendHome('error=unlink_failed');
}

// With the extracted images we need to scan dir 

$scanExtractedSessionFolder = scandir($extractedSessionFolder);

// For later printing.
$fileCount = count($scanExtractedSessionFolder) - 2;
$printString = '';

$printString = '<h2>Success!</h2>';

$printString .= '<p>Number of files in archive: '.$fileCount.'</p>';
$printString .= '<p>Filename: '.$zipUploadDir.$targetFile.'</p>';

if (!mkdir($watermarkedImagesDir.$sessionID)) {
    sendHome('error=500');
}

$watermark = new Imagick($root.'/'.$watermark_image);
$watermarkedSessionFolder = $watermarkedImagesDir.$sessionID;

$positiveString = '<h3>Watermarked Images:</h3>';
$negativeString = '<h3>Unable to Watermark:</h3>';

$positiveCount = 0;
$negativeCount = 0;

$positiveString .= '<ul class="positive">';
$negativeString .= '<ul class="negative">';

for ($i = 2; $i < count($scanExtractedSessionFolder); $i++) {
    $potentialImage = $extractedSessionFolder . '/' . $scanExtractedSessionFolder[$i];
    if (getimagesize($potentialImage)) {
        if (!produceWatermarkedImage($watermark, $potentialImage, $watermarkedSessionFolder)) {
            sendHome('error=500');
        }
        $positiveString .= '<li>' . $scanExtractedSessionFolder[$i] . ' is an image</li>';
        $positiveCount += 1;
    } else {
        $negativeString .= '<li>' . $scanExtractedSessionFolder[$i] . ' is not an image!</li>';
        $negativeCount += 1;
    }
    if (!unlink($potentialImage)) {
        sendHome('error=500');
    }
}

$positiveString .= '</ul>';
$negativeString .= '</ul>';

if ($positiveCount > 0) {
    $printString .= $positiveString;
}

if ($negativeCount > 0) {
    $printString .= $negativeString;
}

if (!rmdir($extractedSessionFolder)) {
    sendHome('error=500');
}

$zip = new ZipArchive();

$targetFile = str_replace('.zip', '', $targetFile);

$fileName = $sessionID.'-'.$targetFile.'.zip';
$zipFilePath = $zipDownloadDir.$fileName;
$scannedWatermarkedSessionFolder = scandir($watermarkedSessionFolder);

if ($zip->open($zipFilePath, ZipArchive::CREATE) === TRUE) {

    for ($i = 2; $i < count($scannedWatermarkedSessionFolder); $i++) {
        $imageOrig = $scannedWatermarkedSessionFolder[$i];
        $image = $watermarkedSessionFolder.'/'.$imageOrig;

        if ($zip->addFile($image, basename($imageOrig)) === FALSE) {
            sendHome('error=500');
        }
    }

    if ($zip->close() === FALSE) {
        sendHome('error=500');
    }


} else {
    sendHome('error=500');
}

$printString .= '<p>'.$fileName.' ready for download now!</p>';
$printString .= '<a class="download glowing-box-button" href="'.$directory_zip_downloads.'/'.$fileName.'" title="download">Download Now!</a>';

if (!is_dir($watermarkedSessionFolder)) {
    sendHome('error=500');
}

for ($i = 2; $i < count($scannedWatermarkedSessionFolder); $i++) {
    $imageOrig = $scannedWatermarkedSessionFolder[$i];
    $image = $watermarkedSessionFolder.'/'.$imageOrig;
    if (!unlink($image)) {
        sendHome('error=500');
    }
}

if (!rmdir($watermarkedSessionFolder)) {
    sendHome('error=500');
}

$printString .= '<a class="back-to-form" href="index.html" title="Back to Form">Back To Form</a>';

?>
<body>
<div class="fixed-svg display-sm">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 32">
        <path
            d="M28 32s-4.714-1.855-8.527-3.34H3.437C1.54 28.66 0 27.026 0 25.013V3.644C0 1.633 1.54 0 3.437 0h21.125c1.898 0 3.437 1.632 3.437 3.645v18.404H28V32zm-4.139-11.982a.88.88 0 00-1.292-.105c-.03.026-3.015 2.681-8.57 2.681-5.486 0-8.517-2.636-8.571-2.684a.88.88 0 00-1.29.107 1.01 1.01 0 00-.219.708.992.992 0 00.318.664c.142.128 3.537 3.15 9.762 3.15 6.226 0 9.621-3.022 9.763-3.15a.992.992 0 00.317-.664 1.01 1.01 0 00-.218-.707z"
        ></path>
    </svg>
</div>
<header class="header-main">
    <div class="flex row justify-between header-top items-center">
        <a href="#" title="Wope.com COPY Logo" class="flex items-center">
            <svg
                width="96"
                height="28"
                viewBox="0 0 96 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M21.6327 18.589C23.2379 16.5709 24.1037 14.0932 24.1037 11.4757C24.1037 5.14843 18.9553 0 12.628 0C6.30066 0 1.15224 5.14843 1.15224 11.4757C1.15224 14.0932 2.01808 16.5709 3.62322 18.589L0 22.2122L0.945766 23.1579C4.06946 26.2816 8.21884 28 12.628 28C17.0371 28 21.1865 26.2816 24.3102 23.1579L25.2559 22.2122L21.6327 18.589ZM12.628 2.67745C16.078 2.67745 19.0685 4.66889 20.5138 7.56613L15.5585 12.5214L12.628 9.59087L5.52807 16.6908C4.42245 15.1922 3.82303 13.3806 3.82303 11.4824C3.82303 6.62702 7.7726 2.67745 12.628 2.67745ZM12.6147 22.9315C15.2322 22.9315 17.7298 22.0723 19.7412 20.4738L21.4263 22.1589C18.9486 24.2036 15.8715 25.3159 12.6213 25.3159C9.37107 25.3159 6.29401 24.2036 3.81637 22.1589L4.78877 21.1865L5.50143 20.4738L6.45385 19.5214L7.40628 18.569L8.7117 17.2636L12.6147 13.3606L15.5452 16.2911L21.3597 10.4767C21.393 10.803 21.4129 11.1361 21.4129 11.4691C21.4129 13.8202 20.5005 16.0314 18.8354 17.6898C17.1703 19.3482 14.9657 20.2674 12.608 20.2674C11.6755 20.2674 10.7631 20.1208 9.89724 19.8411L8.85823 20.8801L7.8392 21.8991C9.31779 22.5785 10.9363 22.9315 12.6147 22.9315Z"
                    fill="white"></path>
                <path
                    d="M46.4492 5.94775H49.8326L45.2836 18.5824H42.6328L39.6823 9.95061L36.865 18.5824H34.2408L29.5586 5.94775H32.942L35.6195 14.0933L38.2969 5.94775H41.081L43.7584 14.0933L46.4359 5.94775H46.4492Z"
                    fill="white"></path>
                <path
                    d="M49.373 12.2481C49.373 8.24526 52.4834 5.62109 56.0867 5.62109C59.6899 5.62109 62.8269 8.24526 62.8269 12.2481C62.8269 16.251 59.6899 18.9018 56.0867 18.9018C52.4834 18.9018 49.373 16.251 49.373 12.2481ZM59.6566 12.2481C59.6566 10.0835 58.0315 8.53832 56.0867 8.53832C54.1418 8.53832 52.5434 10.0835 52.5434 12.2481C52.5434 14.4127 54.1418 15.9846 56.0867 15.9846C58.0315 15.9846 59.6566 14.466 59.6566 12.2481Z"
                    fill="white"></path>
                <path
                    d="M77.7066 12.2748C77.7066 16.3043 74.836 18.9018 71.5125 18.9018C69.914 18.9018 68.1557 18.2491 67.2898 16.897V22.3651H64.1528V5.94745H67.2898V7.62585C68.1557 6.27381 69.9673 5.62109 71.4858 5.62109C74.816 5.62109 77.7066 8.21862 77.7066 12.2748ZM74.5696 12.2748C74.5696 10.1901 72.9445 8.53832 70.9996 8.53832C69.0548 8.53832 67.3498 10.0502 67.3498 12.2748C67.3498 14.4993 69.188 15.9846 70.9996 15.9846C72.9511 15.9846 74.5696 14.3861 74.5696 12.2748Z"
                    fill="white"></path>
                <path
                    d="M91.8595 13.3606H82.0622C82.4151 15.1189 83.7672 16.0647 85.6587 16.0647C87.0108 16.0647 88.3362 15.4719 89.0688 14.4395L91.1801 16.038C90.0146 17.8763 87.7701 18.9086 85.4722 18.9086C81.7092 18.9086 78.8452 16.2045 78.8452 12.255C78.8452 8.30538 81.849 5.62793 85.4722 5.62793C89.0955 5.62793 91.9128 8.19881 91.9128 12.1484C91.9128 12.5014 91.8861 12.9077 91.8595 13.3672V13.3606ZM88.8024 11.1693C88.6159 9.43764 87.2572 8.41195 85.4989 8.41195C83.7406 8.41195 82.4418 9.25115 82.0622 11.1693H88.8024Z"
                    fill="white"></path>
            </svg>
        </a>
        <button id="nav-button" class="none-sm menu-button glowing-box-button">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
            >
                <path
                    d="M4 4H16M4 10H16M4 16H16"
                    stroke="url(#paint0_linear_2514_2120)"
                    stroke-width="1.5"
                    stroke-linecap="square"
                ></path>
                <defs>
                    <linearGradient
                        id="paint0_linear_2514_2120"
                        x1="3.5"
                        y1="-3.5"
                        x2="16"
                        y2="17"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stop-color="white" stop-opacity="0.3"></stop>
                        <stop offset="0.796875" stop-color="white"></stop>
                    </linearGradient>
                </defs>
            </svg>
            Menu
        </button>
    </div>
    <nav
        aria-label="Main Navigation"
        id="header-navigation"
        class="h-0"
        style="z-index: 9"
    >
        <div class="hn-inner">
            <ul>
                <li class="p-0-05">
                    <details>
                        <summary>
                            <p>Products</p>
                            <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 3.75L13.75 10L7.5 16.25" stroke="#676182" stroke-width="1px" stroke-linecap="round" stroke-linejoin="round"></path><defs><clipPath><rect width="20" height="20" fill="white"></rect></clipPath></defs></svg>
                                </span>
                        </summary>
                        <ul class="first">
                            <h4 class="h-4 display-sm w-full">Products</h4>
                            <li>
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.6472 8.82333C21.513 7.68654 20.1649 6.78553 18.6808 6.17224C17.1967 5.55896 15.6058 5.24554 14 5.25005H13.9562C7.22641 5.27302 1.75 10.8282 1.75 17.6236V20.125C1.75 20.5892 1.93437 21.0343 2.26256 21.3625C2.59075 21.6907 3.03587 21.875 3.5 21.875H24.5C24.9641 21.875 25.4092 21.6907 25.7374 21.3625C26.0656 21.0343 26.25 20.5892 26.25 20.125V17.5C26.2545 15.8872 25.9383 14.2895 25.3198 12.7999C24.7013 11.3104 23.7928 9.95864 22.6472 8.82333ZM24.5 20.125H13.0933L19.0827 11.8891C19.2193 11.7014 19.2758 11.4672 19.2397 11.2378C19.2036 11.0085 19.0778 10.8029 18.8902 10.6663C18.7025 10.5297 18.4682 10.4732 18.2389 10.5093C18.0096 10.5454 17.804 10.6711 17.6673 10.8588L10.9287 20.125H3.5V17.6236C3.5 17.2868 3.51641 16.9543 3.54703 16.625H6.125C6.35706 16.625 6.57962 16.5329 6.74372 16.3688C6.90781 16.2047 7 15.9821 7 15.75C7 15.518 6.90781 15.2954 6.74372 15.1313C6.57962 14.9672 6.35706 14.875 6.125 14.875H3.85766C4.98641 10.6247 8.67016 7.4113 13.125 7.03723V9.62505C13.125 9.85711 13.2172 10.0797 13.3813 10.2438C13.5454 10.4079 13.7679 10.5 14 10.5C14.2321 10.5 14.4546 10.4079 14.6187 10.2438C14.7828 10.0797 14.875 9.85711 14.875 9.62505V7.03614C17.0457 7.21882 19.1061 8.07116 20.7715 9.47538C22.4369 10.8796 23.6251 12.7664 24.1719 14.875H21.875C21.6429 14.875 21.4204 14.9672 21.2563 15.1313C21.0922 15.2954 21 15.518 21 15.75C21 15.9821 21.0922 16.2047 21.2563 16.3688C21.4204 16.5329 21.6429 16.625 21.875 16.625H24.4639C24.4869 16.9149 24.5 17.2058 24.5 17.5V20.125Z" fill="url(#paint0_linear_9239_99057)"></path><defs><linearGradient id="paint0_linear_9239_99057" x1="14" y1="5.25" x2="14" y2="21.875" gradientUnits="userSpaceOnUse"><stop offset="0.225" stop-color="white"></stop><stop offset="1" stop-color="white" stop-opacity="0.7"></stop></linearGradient></defs></svg>
                                <div class="flex col inner-text">
                                    <a href="">Rank Tracker</a>
                                    <div class="display-sm">Keep track of your keywords.</div>
                                </div>
                            </li>
                            <li>
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.24985 7C5.24985 6.76794 5.34204 6.54538 5.50613 6.38128C5.67023 6.21719 5.89279 6.125 6.12485 6.125H7.87485V4.375C7.87485 4.14294 7.96704 3.92038 8.13113 3.75628C8.29523 3.59219 8.51779 3.5 8.74985 3.5C8.98192 3.5 9.20448 3.59219 9.36857 3.75628C9.53267 3.92038 9.62485 4.14294 9.62485 4.375V6.125H11.3749C11.6069 6.125 11.8295 6.21719 11.9936 6.38128C12.1577 6.54538 12.2499 6.76794 12.2499 7C12.2499 7.23206 12.1577 7.45462 11.9936 7.61872C11.8295 7.78281 11.6069 7.875 11.3749 7.875H9.62485V9.625C9.62485 9.85706 9.53267 10.0796 9.36857 10.2437C9.20448 10.4078 8.98192 10.5 8.74985 10.5C8.51779 10.5 8.29523 10.4078 8.13113 10.2437C7.96704 10.0796 7.87485 9.85706 7.87485 9.625V7.875H6.12485C5.89279 7.875 5.67023 7.78281 5.50613 7.61872C5.34204 7.45462 5.24985 7.23206 5.24985 7ZM20.1249 21H19.2499V20.125C19.2499 19.8929 19.1577 19.6704 18.9936 19.5063C18.8295 19.3422 18.6069 19.25 18.3749 19.25C18.1428 19.25 17.9202 19.3422 17.7561 19.5063C17.592 19.6704 17.4999 19.8929 17.4999 20.125V21H16.6249C16.3928 21 16.1702 21.0922 16.0061 21.2563C15.842 21.4204 15.7499 21.6429 15.7499 21.875C15.7499 22.1071 15.842 22.3296 16.0061 22.4937C16.1702 22.6578 16.3928 22.75 16.6249 22.75H17.4999V23.625C17.4999 23.8571 17.592 24.0796 17.7561 24.2437C17.9202 24.4078 18.1428 24.5 18.3749 24.5C18.6069 24.5 18.8295 24.4078 18.9936 24.2437C19.1577 24.0796 19.2499 23.8571 19.2499 23.625V22.75H20.1249C20.3569 22.75 20.5795 22.6578 20.7436 22.4937C20.9077 22.3296 20.9999 22.1071 20.9999 21.875C20.9999 21.6429 20.9077 21.4204 20.7436 21.2563C20.5795 21.0922 20.3569 21 20.1249 21ZM26.2499 15.75H24.4999V14C24.4999 13.7679 24.4077 13.5454 24.2436 13.3813C24.0795 13.2172 23.8569 13.125 23.6249 13.125C23.3928 13.125 23.1702 13.2172 23.0061 13.3813C22.842 13.5454 22.7499 13.7679 22.7499 14V15.75H20.9999C20.7678 15.75 20.5452 15.8422 20.3811 16.0063C20.217 16.1704 20.1249 16.3929 20.1249 16.625C20.1249 16.8571 20.217 17.0796 20.3811 17.2437C20.5452 17.4078 20.7678 17.5 20.9999 17.5H22.7499V19.25C22.7499 19.4821 22.842 19.7046 23.0061 19.8687C23.1702 20.0328 23.3928 20.125 23.6249 20.125C23.8569 20.125 24.0795 20.0328 24.2436 19.8687C24.4077 19.7046 24.4999 19.4821 24.4999 19.25V17.5H26.2499C26.4819 17.5 26.7045 17.4078 26.8686 17.2437C27.0327 17.0796 27.1249 16.8571 27.1249 16.625C27.1249 16.3929 27.0327 16.1704 26.8686 16.0063C26.7045 15.8422 26.4819 15.75 26.2499 15.75ZM23.9869 8.75L8.74985 23.987C8.4217 24.315 7.97675 24.4992 7.51282 24.4992C7.04889 24.4992 6.60395 24.315 6.27579 23.987L4.01173 21.7252C3.84918 21.5626 3.72024 21.3697 3.63227 21.1574C3.5443 20.945 3.49902 20.7174 3.49902 20.4876C3.49902 20.2577 3.5443 20.0301 3.63227 19.8178C3.72024 19.6054 3.84918 19.4125 4.01173 19.25L19.2499 4.01297C19.4124 3.85042 19.6053 3.72148 19.8176 3.63351C20.03 3.54554 20.2576 3.50026 20.4874 3.50026C20.7173 3.50026 20.9449 3.54554 21.1572 3.63351C21.3696 3.72148 21.5625 3.85042 21.725 4.01297L23.9869 6.27484C24.1494 6.43735 24.2784 6.63029 24.3663 6.84263C24.4543 7.05498 24.4996 7.28257 24.4996 7.51242C24.4996 7.74227 24.4543 7.96986 24.3663 8.18221C24.2784 8.39456 24.1494 8.58749 23.9869 8.75ZM18.0117 12.25L15.7499 9.98703L5.24985 20.487L7.51173 22.75L18.0117 12.25ZM22.7499 7.51297L20.4869 5.25L16.9869 8.75L19.2499 11.013L22.7499 7.51297Z" fill="url(#paint0_linear_9239_99065)"></path><defs><linearGradient id="paint0_linear_9239_99065" x1="15.3119" y1="3.5" x2="15.3119" y2="24.5" gradientUnits="userSpaceOnUse"><stop offset="0.225" stop-color="white"></stop><stop offset="1" stop-color="white" stop-opacity="0.7"></stop></linearGradient></defs></svg>
                                <div class="flex col inner-text">
                                    <a href="">Content Assistant</a>
                                    <div class="display-sm">Next-generation content assistant</div>
                                </div>
                            </li>
                            <div class="w-full display-sm circle-flower flex row justify-between">
                                <div class="flex row">
                                    <img src="images/header/circle-flower.svg" alt="" draggable="false">
                                    <div class="flex col text">
                                        <h2>Wope Community</h2>
                                        <p>Where SEO and AI meet. Become part of the Wope community.</p>
                                    </div>
                                </div>
                                <button class="glowing-box-button button">Join Community</button>
                            </div>
                        </ul>
                    </details>
                </li>
                <li class="p-0-05">
                    <details>
                        <summary>
                            <p>Resources</p>
                            <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 3.75L13.75 10L7.5 16.25" stroke="#676182" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><defs><clipPath><rect width="20" height="20" fill="white"></rect></clipPath></defs></svg>
                                </span>
                        </summary>
                        <ul class="last">
                            <h4 class="h-4 display-sm w-full">Wope For</h4>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none" q:key="1n_0"><path d="M14 2.625C11.7502 2.625 9.551 3.29213 7.68039 4.54203C5.80978 5.79193 4.35182 7.56847 3.49088 9.64698C2.62993 11.7255 2.40467 14.0126 2.84357 16.2192C3.28248 18.4257 4.36584 20.4525 5.95667 22.0433C7.54749 23.6342 9.57432 24.7175 11.7809 25.1564C13.9874 25.5953 16.2745 25.3701 18.353 24.5091C20.4315 23.6482 22.2081 22.1902 23.458 20.3196C24.7079 18.449 25.375 16.2498 25.375 14C25.3718 10.9841 24.1724 8.09271 22.0398 5.96018C19.9073 3.82764 17.0159 2.62818 14 2.625ZM23.5845 13.125H19.2281C19.0739 10.0122 18.1048 7.05797 16.4806 4.70312C18.3829 5.21383 20.0832 6.29458 21.3532 7.80013C22.6231 9.30567 23.4018 11.1639 23.5845 13.125ZM14 23.613C11.9514 21.3959 10.7089 18.2536 10.5252 14.875H17.4748C17.2911 18.2514 16.0486 21.3959 14 23.613ZM10.5252 13.125C10.7089 9.74859 11.947 6.60406 14 4.38703C16.0486 6.60406 17.2911 9.74641 17.4748 13.125H10.5252ZM11.5194 4.70312C9.89516 7.05797 8.9261 10.0122 8.77188 13.125H4.41547C4.59822 11.1639 5.37689 9.30567 6.64683 7.80013C7.91677 6.29458 9.61712 5.21383 11.5194 4.70312ZM4.41547 14.875H8.77188C8.9261 17.9878 9.89516 20.942 11.5194 23.2969C9.61712 22.7862 7.91677 21.7054 6.64683 20.1999C5.37689 18.6943 4.59822 16.8361 4.41547 14.875ZM16.4806 23.2969C18.1048 20.9387 19.0739 17.9845 19.2281 14.875H23.5845C23.4018 16.8361 22.6231 18.6943 21.3532 20.1999C20.0832 21.7054 18.3829 22.7862 16.4806 23.2969Z" fill="url(#paint0_linear_6772_66915)"></path><defs><linearGradient id="paint0_linear_6772_66915" x1="14" y1="2.625" x2="14" y2="25.375" gradientUnits="userSpaceOnUse"><stop offset="0.225" stop-color="white"></stop><stop offset="1" stop-color="white" stop-opacity="0.7"></stop></linearGradient></defs></svg>
                                <div class="flex col inner-text">
                                    <a href="">Wope For Agencies</a>
                                    <div class="display-sm">Discover your agency's solution for success.</div>
                                </div>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none" q:key="Nb_0"><path d="M11.35 20.3372C11.3073 20.5067 10.2409 24.5 4.37511 24.5C4.14305 24.5 3.92049 24.4078 3.75639 24.2437C3.5923 24.0796 3.50011 23.857 3.50011 23.625C3.50011 17.7592 7.49339 16.6928 7.66292 16.6501C7.88817 16.5938 8.12655 16.6294 8.32562 16.7488C8.52468 16.8683 8.66813 17.062 8.72441 17.2872C8.78068 17.5125 8.74517 17.7509 8.62569 17.9499C8.50621 18.149 8.31255 18.2924 8.0873 18.3487C7.98886 18.3761 5.63511 19.064 5.29167 22.7084C8.93605 22.365 9.62511 20.0156 9.65355 19.9062C9.71156 19.6813 9.85657 19.4886 10.0567 19.3705C10.2568 19.2525 10.4955 19.2187 10.7205 19.2768C10.9455 19.3348 11.1382 19.4798 11.2562 19.6799C11.3742 19.88 11.408 20.1188 11.35 20.3437V20.3372ZM21.5218 12.9653L21.0001 13.487V19.8668C21.0014 20.0975 20.9568 20.3262 20.8689 20.5395C20.7811 20.7528 20.6517 20.9465 20.4882 21.1093L16.7345 24.8609C16.5726 25.0239 16.3801 25.1533 16.1679 25.2415C15.9558 25.3298 15.7283 25.3751 15.4985 25.375C15.3089 25.3749 15.1206 25.3443 14.9407 25.2842C14.632 25.1821 14.3579 24.9956 14.1495 24.7459C13.9412 24.4962 13.8068 24.1931 13.7617 23.8711L13.1743 19.6612L8.33886 14.8258L4.1312 14.2384C3.8087 14.1932 3.50522 14.0589 3.2549 13.8505C3.00457 13.6422 2.81734 13.3682 2.71426 13.0593C2.61117 12.7504 2.59633 12.4189 2.6714 12.102C2.74646 11.7851 2.90846 11.4954 3.13917 11.2656L6.89074 7.51184C7.05357 7.34842 7.24727 7.21901 7.46058 7.13113C7.67389 7.04325 7.90254 6.99867 8.13324 6.99997H14.5131L15.0348 6.47825C17.9529 3.56122 21.4693 3.43544 22.8453 3.51747C23.2719 3.5434 23.6743 3.72457 23.9766 4.02681C24.2788 4.32905 24.46 4.73145 24.4859 5.15809C24.5657 6.53075 24.44 10.0472 21.5229 12.9653H21.5218ZM4.37511 12.5059L8.43839 13.0725L12.7631 8.74997H8.13324L4.37511 12.5059ZM9.98824 14L14.0001 18.0118L20.2837 11.7283C21.1305 10.8872 21.7875 9.87454 22.2104 8.75846C22.6334 7.64238 22.8126 6.4487 22.7359 5.25763C21.5454 5.1838 20.353 5.36485 19.2381 5.78866C18.1232 6.21248 17.1115 6.86931 16.2707 7.71528L9.98824 14ZM19.2501 15.237L14.9265 19.5606L15.4953 23.625L19.2501 19.8668V15.237Z" fill="url(#paint0_linear_6772_66923)"></path><defs><linearGradient id="paint0_linear_6772_66923" x1="13.5628" y1="3.50134" x2="13.5628" y2="25.375" gradientUnits="userSpaceOnUse"><stop offset="0.225" stop-color="white"></stop><stop offset="1" stop-color="white" stop-opacity="0.7"></stop></linearGradient></defs></svg>
                                <div class="flex col inner-text">
                                    <a href="">Wope For Startups</a>
                                    <div class="display-sm">Discover the benefits of Wope for startups.</div>
                                </div>
                            </li>
                            <div class="thing display-sm"></div>
                            <h4 class="h-4 display-sm w-full">Get Started</h4>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none" q:key="Ye_0"><path d="M13.0988 23.8371C13.0514 24.0264 12.9422 24.1945 12.7884 24.3146C12.6346 24.4347 12.4451 24.4999 12.25 24.4999C12.1763 24.5003 12.1028 24.4915 12.0313 24.4737L8.53126 23.5987C8.43382 23.5742 8.34133 23.5331 8.25783 23.4773L5.63283 21.7273C5.43978 21.5985 5.3058 21.3983 5.26037 21.1707C5.21493 20.9431 5.26177 20.7068 5.39056 20.5138C5.51936 20.3207 5.71957 20.1867 5.94714 20.1413C6.17472 20.0959 6.41103 20.1427 6.60408 20.2715L9.1022 21.9373L12.4556 22.7762C12.5677 22.8034 12.6733 22.8524 12.7663 22.9205C12.8593 22.9886 12.938 23.0744 12.9977 23.173C13.0575 23.2716 13.0972 23.381 13.1145 23.495C13.1319 23.6089 13.1265 23.7252 13.0988 23.8371ZM27.6117 13.2868C27.5399 13.5049 27.4256 13.7066 27.2755 13.8802C27.1253 14.0539 26.9422 14.196 26.7367 14.2985L24.1467 15.5935L18.1224 21.619C18.0154 21.7258 17.8827 21.8031 17.737 21.8434C17.5913 21.8836 17.4377 21.8854 17.2911 21.8487L10.2911 20.0987C10.1847 20.072 10.0841 20.0256 9.9947 19.962L3.9222 15.6263L1.26658 14.2985C0.851539 14.0911 0.535888 13.7272 0.389033 13.2871C0.242177 12.8469 0.27614 12.3665 0.483453 11.9513L3.20142 6.5165C3.4089 6.10146 3.77271 5.78581 4.21287 5.63896C4.65303 5.4921 5.13349 5.52606 5.54861 5.73337L7.96142 6.9365L13.7583 5.28056C13.9156 5.23558 14.0823 5.23558 14.2395 5.28056L20.0364 6.9365L22.4492 5.73337C22.8644 5.52606 23.3448 5.4921 23.785 5.63896C24.2251 5.78581 24.5889 6.10146 24.7964 6.5165L27.5144 11.9513C27.6181 12.1565 27.68 12.3801 27.6967 12.6093C27.7135 12.8386 27.6846 13.0688 27.6117 13.2868ZM22.5608 14.7021L19.5847 8.74994H16.1044L11.375 13.3437C12.7597 14.2285 14.9308 14.4724 16.8788 12.5092C17.0309 12.3558 17.2344 12.2642 17.45 12.2518C17.6657 12.2395 17.8783 12.3074 18.0469 12.4424L21.8105 15.4579L22.5608 14.7021ZM2.04861 12.7334L3.98345 13.7013L6.70142 8.2665L4.76658 7.29853L2.04861 12.7334ZM20.5625 16.6971L17.5317 14.2701C15.3945 16.0201 12.681 16.2509 10.4322 14.817C10.211 14.6763 10.0242 14.4876 9.88571 14.2651C9.74719 14.0425 9.66044 13.7916 9.63188 13.531C9.60332 13.2704 9.63368 13.0067 9.72071 12.7594C9.80774 12.5121 9.94922 12.2876 10.1347 12.1023C10.1373 12.0991 10.1403 12.0962 10.1435 12.0935L15.05 7.33462L14 7.03494L8.48533 8.61103L5.49173 14.5971L10.873 18.4417L17.232 20.0309L20.5625 16.6971ZM25.9481 12.7334L23.2335 7.29853L21.2986 8.2665L24.0166 13.7013L25.9481 12.7334Z" fill="url(#paint0_linear_6772_66935)"></path><defs><linearGradient id="paint0_linear_6772_66935" x1="14.0002" y1="5.24683" x2="14.0002" y2="24.4999" gradientUnits="userSpaceOnUse"><stop offset="0.225" stop-color="white"></stop><stop offset="1" stop-color="white" stop-opacity="0.7"></stop></linearGradient></defs></svg>
                                <div class="flex col inner-text">
                                    <a href="">Partnership</a>
                                    <div class="display-sm">Grow together with Wope!</div>
                                </div>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none" q:key="1n_0"><path d="M14 2.625C11.7502 2.625 9.551 3.29213 7.68039 4.54203C5.80978 5.79193 4.35182 7.56847 3.49088 9.64698C2.62993 11.7255 2.40467 14.0126 2.84357 16.2192C3.28248 18.4257 4.36584 20.4525 5.95667 22.0433C7.54749 23.6342 9.57432 24.7175 11.7809 25.1564C13.9874 25.5953 16.2745 25.3701 18.353 24.5091C20.4315 23.6482 22.2081 22.1902 23.458 20.3196C24.7079 18.449 25.375 16.2498 25.375 14C25.3718 10.9841 24.1724 8.09271 22.0398 5.96018C19.9073 3.82764 17.0159 2.62818 14 2.625ZM23.5845 13.125H19.2281C19.0739 10.0122 18.1048 7.05797 16.4806 4.70312C18.3829 5.21383 20.0832 6.29458 21.3532 7.80013C22.6231 9.30567 23.4018 11.1639 23.5845 13.125ZM14 23.613C11.9514 21.3959 10.7089 18.2536 10.5252 14.875H17.4748C17.2911 18.2514 16.0486 21.3959 14 23.613ZM10.5252 13.125C10.7089 9.74859 11.947 6.60406 14 4.38703C16.0486 6.60406 17.2911 9.74641 17.4748 13.125H10.5252ZM11.5194 4.70312C9.89516 7.05797 8.9261 10.0122 8.77188 13.125H4.41547C4.59822 11.1639 5.37689 9.30567 6.64683 7.80013C7.91677 6.29458 9.61712 5.21383 11.5194 4.70312ZM4.41547 14.875H8.77188C8.9261 17.9878 9.89516 20.942 11.5194 23.2969C9.61712 22.7862 7.91677 21.7054 6.64683 20.1999C5.37689 18.6943 4.59822 16.8361 4.41547 14.875ZM16.4806 23.2969C18.1048 20.9387 19.0739 17.9845 19.2281 14.875H23.5845C23.4018 16.8361 22.6231 18.6943 21.3532 20.1999C20.0832 21.7054 18.3829 22.7862 16.4806 23.2969Z" fill="url(#paint0_linear_6772_66915)"></path><defs><linearGradient id="paint0_linear_6772_66915" x1="14" y1="2.625" x2="14" y2="25.375" gradientUnits="userSpaceOnUse"><stop offset="0.225" stop-color="white"></stop><stop offset="1" stop-color="white" stop-opacity="0.7"></stop></linearGradient></defs></svg>
                                <div class="flex col inner-text">
                                    <a href="">Affiliate</a>
                                    <div class="display-sm">Start, share and earn with Wope.</div>
                                </div>
                            </li>
                            <div class="thing display-sm"></div>
                            <h4 class="h-4 display-sm w-full">Free Tools</h4>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none" q:key="Ts_0"><path d="M23.3691 9.00594L17.2441 2.88094C17.1627 2.79971 17.0662 2.7353 16.96 2.69138C16.8538 2.64747 16.7399 2.62491 16.625 2.625H6.125C5.66087 2.625 5.21575 2.80937 4.88756 3.13756C4.55937 3.46575 4.375 3.91087 4.375 4.375V23.625C4.375 24.0891 4.55937 24.5342 4.88756 24.8624C5.21575 25.1906 5.66087 25.375 6.125 25.375H21.875C22.3391 25.375 22.7842 25.1906 23.1124 24.8624C23.4406 24.5342 23.625 24.0891 23.625 23.625V9.625C23.6251 9.51006 23.6025 9.39623 23.5586 9.29001C23.5147 9.18379 23.4503 9.08726 23.3691 9.00594ZM17.5 5.61203L20.638 8.75H17.5V5.61203ZM21.875 23.625H6.125V4.375H15.75V9.625C15.75 9.85706 15.8422 10.0796 16.0063 10.2437C16.1704 10.4078 16.3929 10.5 16.625 10.5H21.875V23.625ZM18.375 14.875C18.375 15.1071 18.2828 15.3296 18.1187 15.4937C17.9546 15.6578 17.7321 15.75 17.5 15.75H10.5C10.2679 15.75 10.0454 15.6578 9.88128 15.4937C9.71719 15.3296 9.625 15.1071 9.625 14.875C9.625 14.6429 9.71719 14.4204 9.88128 14.2563C10.0454 14.0922 10.2679 14 10.5 14H17.5C17.7321 14 17.9546 14.0922 18.1187 14.2563C18.2828 14.4204 18.375 14.6429 18.375 14.875ZM18.375 18.375C18.375 18.6071 18.2828 18.8296 18.1187 18.9937C17.9546 19.1578 17.7321 19.25 17.5 19.25H10.5C10.2679 19.25 10.0454 19.1578 9.88128 18.9937C9.71719 18.8296 9.625 18.6071 9.625 18.375C9.625 18.1429 9.71719 17.9204 9.88128 17.7563C10.0454 17.5922 10.2679 17.5 10.5 17.5H17.5C17.7321 17.5 17.9546 17.5922 18.1187 17.7563C18.2828 17.9204 18.375 18.1429 18.375 18.375Z" fill="url(#paint0_linear_6772_66955)"></path><defs><linearGradient id="paint0_linear_6772_66955" x1="14" y1="2.625" x2="14" y2="25.375" gradientUnits="userSpaceOnUse"><stop offset="0.225" stop-color="white"></stop><stop offset="1" stop-color="white" stop-opacity="0.7"></stop></linearGradient></defs></svg>
                                <div class="flex col inner-text">
                                    <a href="">AI Content Writer</a>
                                    <div class="display-sm">Create content with AI. Completely free!</div>
                                </div>
                            </li>
                            <div class="w-full display-sm circle-flower flex row justify-between">
                                <div class="flex row">
                                    <img src="images/header/circle-flower.svg" alt="" draggable="false">
                                    <div class="flex col text">
                                        <h2>Wope Community</h2>
                                        <p>Where SEO and AI meet. Become part of the Wope community.</p>
                                    </div>
                                </div>
                                <button class="glowing-box-button button">Join Community</button>
                            </div>
                        </ul>
                    </details>
                </li>
                <li>
                    <a href="" title="" class='a'>Pricing</a>
                </li>
                <li>
                    <a href="" title="" class='a'>Download</a>
                </li>
                <li>
                    <a href="" title="" class='a'>Contact Us</a>
                </li>
            </ul>
            <div class="none-sm" id="header-card">
                <img src="images/header/circle-flower.svg" alt="" draggable="false">
                <div>
                    <h2>Wope Community</h2>
                    <p>Where SEO and AI meet. Become part of the Wope community.</p>
                    <button class="glowing-box-button button">Join Community</button>
                </div>
            </div>
            <div class="log-reg">
                <div class="lr-inner">
                    <button href="" title="" class="glowing-box-button ghost">Log In</button>
                    <button href="" title="" class="glowing-box-button">Sign Up</button>
                </div>
            </div>
        </div>
    </nav>
</header>
<main>
    <section id="processedForm">
        <div class="cards magical-borders-container">
            <div class="magical-borders data">
                <div class="magical-borders-inner">
                    <div class="data-inner">
                        <div class="data-inner-container">
                            <div class="dic-inner">
                                <?= $printString ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>
<footer>
    <!-- wope logo -->
    <div class="footer-top">
        <div class="top">
            <svg
                width="96"
                height="28"
                viewBox="0 0 96 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M21.6327 18.589C23.2379 16.5709 24.1037 14.0932 24.1037 11.4757C24.1037 5.14843 18.9553 0 12.628 0C6.30066 0 1.15224 5.14843 1.15224 11.4757C1.15224 14.0932 2.01808 16.5709 3.62322 18.589L0 22.2122L0.945766 23.1579C4.06946 26.2816 8.21884 28 12.628 28C17.0371 28 21.1865 26.2816 24.3102 23.1579L25.2559 22.2122L21.6327 18.589ZM12.628 2.67745C16.078 2.67745 19.0685 4.66889 20.5138 7.56613L15.5585 12.5214L12.628 9.59087L5.52807 16.6908C4.42245 15.1922 3.82303 13.3806 3.82303 11.4824C3.82303 6.62702 7.7726 2.67745 12.628 2.67745ZM12.6147 22.9315C15.2322 22.9315 17.7298 22.0723 19.7412 20.4738L21.4263 22.1589C18.9486 24.2036 15.8715 25.3159 12.6213 25.3159C9.37107 25.3159 6.29401 24.2036 3.81637 22.1589L4.78877 21.1865L5.50143 20.4738L6.45385 19.5214L7.40628 18.569L8.7117 17.2636L12.6147 13.3606L15.5452 16.2911L21.3597 10.4767C21.393 10.803 21.4129 11.1361 21.4129 11.4691C21.4129 13.8202 20.5005 16.0314 18.8354 17.6898C17.1703 19.3482 14.9657 20.2674 12.608 20.2674C11.6755 20.2674 10.7631 20.1208 9.89724 19.8411L8.85823 20.8801L7.8392 21.8991C9.31779 22.5785 10.9363 22.9315 12.6147 22.9315Z"
                    fill="white"
                ></path>
                <path
                    d="M46.4492 5.94775H49.8326L45.2836 18.5824H42.6328L39.6823 9.95061L36.865 18.5824H34.2408L29.5586 5.94775H32.942L35.6195 14.0933L38.2969 5.94775H41.081L43.7584 14.0933L46.4359 5.94775H46.4492Z"
                    fill="white"
                ></path>
                <path
                    d="M49.373 12.2481C49.373 8.24526 52.4834 5.62109 56.0867 5.62109C59.6899 5.62109 62.8269 8.24526 62.8269 12.2481C62.8269 16.251 59.6899 18.9018 56.0867 18.9018C52.4834 18.9018 49.373 16.251 49.373 12.2481ZM59.6566 12.2481C59.6566 10.0835 58.0315 8.53832 56.0867 8.53832C54.1418 8.53832 52.5434 10.0835 52.5434 12.2481C52.5434 14.4127 54.1418 15.9846 56.0867 15.9846C58.0315 15.9846 59.6566 14.466 59.6566 12.2481Z"
                    fill="white"
                ></path>
                <path
                    d="M77.7066 12.2748C77.7066 16.3043 74.836 18.9018 71.5125 18.9018C69.914 18.9018 68.1557 18.2491 67.2898 16.897V22.3651H64.1528V5.94745H67.2898V7.62585C68.1557 6.27381 69.9673 5.62109 71.4858 5.62109C74.816 5.62109 77.7066 8.21862 77.7066 12.2748ZM74.5696 12.2748C74.5696 10.1901 72.9445 8.53832 70.9996 8.53832C69.0548 8.53832 67.3498 10.0502 67.3498 12.2748C67.3498 14.4993 69.188 15.9846 70.9996 15.9846C72.9511 15.9846 74.5696 14.3861 74.5696 12.2748Z"
                    fill="white"
                ></path>
                <path
                    d="M91.8595 13.3606H82.0622C82.4151 15.1189 83.7672 16.0647 85.6587 16.0647C87.0108 16.0647 88.3362 15.4719 89.0688 14.4395L91.1801 16.038C90.0146 17.8763 87.7701 18.9086 85.4722 18.9086C81.7092 18.9086 78.8452 16.2045 78.8452 12.255C78.8452 8.30538 81.849 5.62793 85.4722 5.62793C89.0955 5.62793 91.9128 8.19881 91.9128 12.1484C91.9128 12.5014 91.8861 12.9077 91.8595 13.3672V13.3606ZM88.8024 11.1693C88.6159 9.43764 87.2572 8.41195 85.4989 8.41195C83.7406 8.41195 82.4418 9.25115 82.0622 11.1693H88.8024Z"
                    fill="white"
                ></path>
            </svg>

            <div class="description">
                <span>Experience the next generation</span>
                <span>of SEO analytics.</span>
            </div>

            <button class="glowing-box-button">
                <span>Unlimited trial for 14 days</span>
            </button>
        </div>
        <div class="right">
            <nav aria-label="Site Map for wope.com">
                <div class="nav-group">
                    <details>
                        <summary>
                            <h2>Platform</h2>
                            <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                        <g clip-path="url(#clip0_5618_76557)">
                            <path
                                d="M7.5 3.75L13.75 10L7.5 16.25"
                                stroke="#676182"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>
                        </g>
                        <defs>
                            <clipPath id="clip0_5618_76557">
                            <rect width="20" height="20" fill="white"></rect>
                            </clipPath>
                        </defs>
                        </svg>
                    </span>
                        </summary>
                        <ul>
                            <li>
                                <a href="">Features</a>
                            </li>
                            <li>
                                <a href="">Pricing</a>
                            </li>
                            <li>
                                <a href="">Wiki</a>
                            </li>
                            <li>
                                <a href="">Partnership</a>
                            </li>
                            <li>
                                <a href="">Affiliate</a>
                            </li>
                            <li>
                                <a href="">Download</a>
                            </li>
                            <li>
                                <a href="">Community</a>
                            </li>
                            <li>
                                <a href="">Contact Us</a>
                            </li>
                        </ul>
                    </details>
                </div>
                <div class="nav-group">
                    <details>
                        <summary>
                            <h2>Legals</h2>
                            <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                        <g clip-path="url(#clip0_5618_76557)">
                            <path
                                d="M7.5 3.75L13.75 10L7.5 16.25"
                                stroke="#676182"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>
                        </g>
                        <defs>
                            <clipPath id="clip0_5618_76557">
                            <rect width="20" height="20" fill="white"></rect>
                            </clipPath>
                        </defs>
                        </svg>
                    </span>
                        </summary>
                        <ul>
                            <li>
                                <a href="">Terms of Services</a>
                            </li>
                            <li>
                                <a href="">Privacy Policy</a>
                            </li>
                        </ul>
                    </details>
                    <details>
                        <summary>
                            <h2>Free Tools</h2>
                            <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                        <g clip-path="url(#clip0_5618_76557)">
                            <path
                                d="M7.5 3.75L13.75 10L7.5 16.25"
                                stroke="#676182"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>
                        </g>
                        <defs>
                            <clipPath id="clip0_5618_76557">
                            <rect width="20" height="20" fill="white"></rect>
                            </clipPath>
                        </defs>
                        </svg>
                    </span>
                        </summary>
                        <ul>
                            <li>
                                <a href="">Content Generator</a>
                            </li>
                        </ul>
                    </details>
                </div>
                <div class="nav-group">
                    <details>
                        <summary>
                            <h2>Wope for</h2>
                            <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                        <g clip-path="url(#clip0_5618_76557)">
                            <path
                                d="M7.5 3.75L13.75 10L7.5 16.25"
                                stroke="#676182"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>
                        </g>
                        <defs>
                            <clipPath id="clip0_5618_76557">
                            <rect width="20" height="20" fill="white"></rect>
                            </clipPath>
                        </defs>
                        </svg>
                    </span>
                        </summary>
                        <ul>
                            <li>
                                <a href="">Agencies</a>
                            </li>
                            <li>
                                <a href="">Startups</a>
                            </li>
                        </ul>
                    </details>
                    <details>
                        <summary>
                            <h2>Success Stories</h2>
                            <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                        <g clip-path="url(#clip0_5618_76557)">
                            <path
                                d="M7.5 3.75L13.75 10L7.5 16.25"
                                stroke="#676182"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>
                        </g>
                        <defs>
                            <clipPath id="clip0_5618_76557">
                            <rect width="20" height="20" fill="white"></rect>
                            </clipPath>
                        </defs>
                        </svg>
                    </span>
                        </summary>
                        <ul>
                            <li>
                                <a href="">PizzaHut</a>
                            </li>
                        </ul>
                    </details>
                </div>
            </nav>
            <div class="magical-borders-container">
                <div class="magical-borders footer-contact-sizing">
                    <div class="magical-borders-inner">
                        <div class="footer-contact-inner">
                            <img
                                src="images/footer/grid.svg"
                                draggable="false"
                                height="1"
                                width="1"
                                alt="GRID"
                                class="lazy-image lazy-image-loaded footer-contact-inner-grid"
                            />
                            <div class="footer-contact-inner-title">Get in touch</div>
                            <div class="footer-contact-inner-description">
                                651 N Broad St<br />
                                Suite 201<br />
                                Middletown, Delaware 19709<br />
                                United States
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer-bottom">
        <p class="footer-copyright">©2025 Wope. All rights reserved.</p>
        <div>
            <ul>
                <li>
                    <a href="" title="Instagram" aria-label="Instagram">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12.0007 4C9.82806 4 9.55539 4.0095 8.70205 4.04833C7.85037 4.08733 7.26903 4.22217 6.76036 4.42C6.23419 4.62433 5.78785 4.89767 5.34318 5.3425C4.89818 5.78717 4.62484 6.2335 4.41984 6.7595C4.2215 7.26833 4.0865 7.84983 4.04817 8.70117C4.01 9.5545 4 9.82733 4 12C4 14.1727 4.00967 14.4445 4.04833 15.2978C4.0875 16.1495 4.22234 16.7308 4.42 17.2395C4.62451 17.7657 4.89784 18.212 5.34268 18.6567C5.78719 19.1017 6.23352 19.3757 6.75936 19.58C7.26837 19.7778 7.84987 19.9127 8.70138 19.9517C9.55472 19.9905 9.82723 20 11.9998 20C14.1726 20 14.4444 19.9905 15.2978 19.9517C16.1495 19.9127 16.7315 19.7778 17.2405 19.58C17.7665 19.3757 18.2121 19.1017 18.6567 18.6567C19.1017 18.212 19.375 17.7657 19.58 17.2397C19.7767 16.7308 19.9117 16.1493 19.9517 15.298C19.99 14.4447 20 14.1727 20 12C20 9.82733 19.99 9.55467 19.9517 8.70133C19.9117 7.84967 19.7767 7.26833 19.58 6.75967C19.375 6.2335 19.1017 5.78717 18.6567 5.3425C18.2116 4.8975 17.7666 4.62417 17.24 4.42C16.73 4.22217 16.1483 4.08733 15.2966 4.04833C14.4433 4.0095 14.1716 4 11.9982 4H12.0007ZM11.2831 5.44167C11.4961 5.44133 11.7337 5.44167 12.0007 5.44167C14.1368 5.44167 14.3899 5.44933 15.2335 5.48767C16.0135 5.52333 16.4368 5.65367 16.7188 5.76317C17.0921 5.90817 17.3583 6.0815 17.6381 6.3615C17.9181 6.6415 18.0915 6.90817 18.2368 7.2815C18.3463 7.56317 18.4768 7.9865 18.5123 8.7665C18.5507 9.60983 18.559 9.86317 18.559 11.9982C18.559 14.1332 18.5507 14.3865 18.5123 15.2298C18.4767 16.0098 18.3463 16.4332 18.2368 16.7148C18.0918 17.0882 17.9181 17.354 17.6381 17.6338C17.3581 17.9138 17.0923 18.0872 16.7188 18.2322C16.4371 18.3422 16.0135 18.4722 15.2335 18.5078C14.3901 18.5462 14.1368 18.5545 12.0007 18.5545C9.86456 18.5545 9.61139 18.5462 8.76805 18.5078C7.98804 18.4718 7.5647 18.3415 7.28253 18.232C6.9092 18.087 6.64253 17.9137 6.36252 17.6337C6.08252 17.3537 5.90919 17.0877 5.76385 16.7142C5.65435 16.4325 5.52385 16.0092 5.48835 15.2292C5.45002 14.3858 5.44235 14.1325 5.44235 11.9962C5.44235 9.85983 5.45002 9.60783 5.48835 8.7645C5.52402 7.9845 5.65435 7.56117 5.76385 7.27917C5.90885 6.90583 6.08252 6.63917 6.36252 6.35917C6.64253 6.07917 6.9092 5.90583 7.28253 5.7605C7.56454 5.6505 7.98804 5.5205 8.76805 5.48467C9.50606 5.45133 9.79206 5.44133 11.2831 5.43967V5.44167ZM16.2711 6.77C15.7411 6.77 15.3111 7.1995 15.3111 7.72967C15.3111 8.25967 15.7411 8.68967 16.2711 8.68967C16.8011 8.68967 17.2311 8.25967 17.2311 7.72967C17.2311 7.19967 16.8011 6.76967 16.2711 6.76967V6.77ZM12.0007 7.89167C9.73189 7.89167 7.89237 9.73117 7.89237 12C7.89237 14.2688 9.73189 16.1075 12.0007 16.1075C14.2696 16.1075 16.1085 14.2688 16.1085 12C16.1085 9.73117 14.2694 7.89167 12.0006 7.89167H12.0007ZM12.0007 9.33333C13.4734 9.33333 14.6674 10.5272 14.6674 12C14.6674 13.4727 13.4734 14.6667 12.0007 14.6667C10.5279 14.6667 9.33406 13.4727 9.33406 12C9.33406 10.5272 10.5279 9.33333 12.0007 9.33333Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="" title="YouTube" aria-label="YouTube">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12.3988 18.4349L8.70588 18.3674C7.5102 18.3439 6.31154 18.3908 5.13931 18.147C3.35607 17.7827 3.22973 15.9965 3.09754 14.4982C2.91539 12.3918 2.98591 10.2471 3.32964 8.15831C3.52369 6.98626 4.28736 6.28688 5.46834 6.21078C9.45503 5.93458 13.4682 5.96731 17.4461 6.09617C17.8662 6.10798 18.2892 6.17255 18.7034 6.24604C20.7483 6.60447 20.7981 8.62865 20.9307 10.3326C21.0629 12.0542 21.007 13.7846 20.7544 15.4944C20.5517 16.9101 20.1638 18.0973 18.5271 18.2119C16.4764 18.3618 14.4728 18.4825 12.4164 18.444C12.4165 18.4349 12.4046 18.4349 12.3988 18.4349ZM10.2277 14.8508C11.7731 13.9635 13.289 13.091 14.8255 12.2096C13.2772 11.3224 11.7642 10.4499 10.2277 9.56851V14.8508Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="" title="LinkedIn" aria-label="LinkedIn">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clip-path="url(#clip0_3007_48641)">
                                <path
                                    d="M8.17805 18.9997V9.55356H5.1769V18.9997H8.17836H8.17805ZM6.6781 8.26408C7.72445 8.26408 8.37587 7.53873 8.37587 6.63224C8.35628 5.70511 7.72445 5 6.698 5C5.67085 5 5 5.70511 5 6.63216C5 7.53864 5.65118 8.26399 6.65844 8.26399H6.67787L6.6781 8.26408ZM9.83923 18.9997H12.8401V13.7251C12.8401 13.4432 12.8597 13.1605 12.939 12.9591C13.1559 12.3948 13.6497 11.8107 14.4789 11.8107C15.5646 11.8107 15.9992 12.6768 15.9992 13.9468V18.9997H19V13.5836C19 10.6822 17.5196 9.3321 15.5452 9.3321C13.9264 9.3321 13.2154 10.2787 12.8204 10.9234H12.8404V9.55389H9.83939C9.87856 10.44 9.83915 19 9.83915 19L9.83923 18.9997Z"
                                    fill="currentColor"
                                ></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_3007_48641">
                                    <rect
                                        width="18"
                                        height="18"
                                        fill="white"
                                        transform="translate(3 3)"
                                    ></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="" title="Twitter" aria-label="Twitter">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8.66082 19.6341C15.4536 19.6341 19.1683 14.0045 19.1683 9.12273C19.1683 8.96285 19.1651 8.80371 19.1579 8.64522C19.8807 8.12202 20.5045 7.47421 21 6.73217C20.3383 7.02646 19.6262 7.22454 18.8792 7.31384C19.6417 6.85649 20.227 6.13294 20.5032 5.27048C19.7783 5.70068 18.9852 6.00395 18.1582 6.16722C17.4843 5.44912 16.5248 5 15.4625 5C13.4231 5 11.7693 6.65446 11.7693 8.69384C11.7693 8.98378 11.8017 9.26571 11.8651 9.53622C8.79574 9.38172 6.07409 7.91165 4.25261 5.67632C3.92454 6.24011 3.75199 6.88087 3.75256 7.53317C3.75256 8.8149 4.40451 9.94638 5.39598 10.6084C4.80951 10.5904 4.23592 10.432 3.72344 10.1463C3.72289 10.1618 3.72289 10.1769 3.72289 10.1935C3.72289 11.9826 4.99584 13.4764 6.68565 13.8149C6.36828 13.9014 6.04079 13.9451 5.71185 13.9449C5.4743 13.9449 5.24279 13.9215 5.01779 13.8783C5.48795 15.3462 6.85127 16.4144 8.46765 16.4442C7.20366 17.4353 5.61143 18.0256 3.8809 18.0256C3.58652 18.0258 3.29237 18.0088 3 17.9744C4.63441 19.0224 6.57494 19.6341 8.66082 19.6341Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="" title="Discord" aria-label="Discord">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clip-path="url(#clip0_2990_46224)">
                                <path
                                    d="M18.2378 6.2418C17.0905 5.71539 15.8602 5.32755 14.5739 5.10542C14.5505 5.10114 14.5271 5.11185 14.515 5.13328C14.3568 5.41469 14.1815 5.78181 14.0588 6.07037C12.6753 5.86324 11.2989 5.86324 9.94374 6.07037C9.82099 5.7754 9.63936 5.41469 9.48043 5.13328C9.46836 5.11257 9.44496 5.10185 9.42154 5.10542C8.13593 5.32684 6.90567 5.71468 5.7577 6.2418C5.74776 6.24609 5.73924 6.25324 5.73359 6.26251C3.40004 9.74879 2.76079 13.1494 3.07439 16.5078C3.0758 16.5242 3.08503 16.5399 3.0978 16.5499C4.63741 17.6806 6.12878 18.367 7.59246 18.822C7.61588 18.8291 7.6407 18.8205 7.65561 18.8012C8.00184 18.3284 8.31048 17.8299 8.57511 17.3056C8.59072 17.2749 8.57582 17.2385 8.5439 17.2263C8.05435 17.0406 7.5882 16.8142 7.1398 16.5571C7.10433 16.5364 7.10149 16.4856 7.13412 16.4613C7.22848 16.3906 7.32286 16.3171 7.41297 16.2428C7.42927 16.2292 7.45198 16.2264 7.47115 16.2349C10.417 17.5799 13.6062 17.5799 16.5172 16.2349C16.5364 16.2256 16.5591 16.2285 16.5761 16.2421C16.6662 16.3164 16.7606 16.3906 16.8557 16.4613C16.8883 16.4856 16.8862 16.5364 16.8507 16.5571C16.4023 16.8192 15.9361 17.0406 15.4459 17.2256C15.414 17.2377 15.3998 17.2749 15.4154 17.3056C15.6857 17.8291 15.9943 18.3277 16.3342 18.8005C16.3484 18.8205 16.3739 18.8291 16.3973 18.822C17.8681 18.367 19.3595 17.6806 20.8991 16.5499C20.9126 16.5399 20.9211 16.5249 20.9225 16.5085C21.2978 12.6258 20.2939 9.2531 18.2612 6.26322C18.2562 6.25324 18.2477 6.24609 18.2378 6.2418ZM9.01502 14.4629C8.12812 14.4629 7.39735 13.6486 7.39735 12.6487C7.39735 11.6487 8.11395 10.8345 9.01502 10.8345C9.92315 10.8345 10.6469 11.6558 10.6327 12.6487C10.6327 13.6486 9.91606 14.4629 9.01502 14.4629ZM14.9961 14.4629C14.1092 14.4629 13.3784 13.6486 13.3784 12.6487C13.3784 11.6487 14.095 10.8345 14.9961 10.8345C15.9042 10.8345 16.6279 11.6558 16.6137 12.6487C16.6137 13.6486 15.9042 14.4629 14.9961 14.4629Z"
                                    fill="currentColor"
                                ></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_2990_46224">
                                    <rect
                                        width="18"
                                        height="13.9437"
                                        fill="white"
                                        transform="translate(3 5)"
                                    ></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</footer>
<script src="javascript/faq-dropdown.js" type="module" media="max-width: 100px;"></script>
<script src="javascript/magical-borders.js"></script>
<script src="javascript/search-table.js"></script>
<script src="javascript/spreadsheets.js"></script>
<script src="javascript/navigation.js" type="module"></script>
</body>
</html>




