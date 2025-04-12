<?php

function sendHome($string) {
    header('Location: index.php?'.$string);
    exit();
}

function produceWatermarkedImage($watermark, $file, $dir) {
    $image = new Imagick($file);

    $imageWidth = $image->getImageWidth();
    $imageHeight = $image->getImageHeight();

    $watermarkWidth = $watermark->getImageWidth();
    $watermarkHeight = $watermark->getImageHeight();

    $x = $imageWidth - $watermarkWidth - 10;
    $y = $imageHeight - $watermarkHeight - 10;

    if ($image->compositeImage($watermark, Imagick::COMPOSITE_OVER, $x, $y) === FALSE) {
        return 0;
    }

    if ($image->writeImage($dir.'/watermarked_' . basename($file)) === FALSE) {
        return 0;
    }

    if ($image->destroy() === FALSE) {
        return 0;
    }

    return 1;
}