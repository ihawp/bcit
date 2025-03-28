<?php

include("config.php");

function displayGallery($gallery) {
        $directoryGallery = GALLERIES_DIRECTORY.$gallery;
        if (is_dir($directoryGallery) && is_readable($directoryGallery)) {
                $scanned = scandir(GALLERIES_DIRECTORY.$gallery);
                echo '<ul class="image-grid">';
                for ($i = 2; $i < count($scanned); $i++) {
                        $image = $scanned[$i];
                        $stringg = GALLERIES_DIRECTORY.$gallery.'/'.$image;
                        if (imageExists($stringg)) {
                                printImage($gallery, $image, 0);
                        } else {
                                echo '<p>Image does not exist.</p>';
                        }
                }
                echo '</ul>'; 
        } else {
                echo '<p>Gallery does not exist.</p>';
        }
}

function imageExists($src) {
        if (file_exists($src) && exif_imagetype($src)) {
                return 1;
        }
        return 0;
}

function printImage($path, $src, $linkToPage) {
    
    $stringLocation = GALLERIES_DIRECTORY.$path.'/'.$src;
    $stringLocationExists = imageExists($stringLocation);

    ?><li>
            <a	class='example-image-link' <?php
                if ($linkToPage) { ?>
                        href='index.php?type=<?= $path ?>'
                <?php } else { 
                        if ($stringLocationExists) { ?>
                                href='<?= $stringLocation ?>' 	
                        <?php } else { ?>
                                href='<?= $src ?>' 	
                        <?php } ?>
                        data-lightbox='lab-sample' 
                <?php } ?>
                data-title='<?= $src ?>'	>
            <img	
                class='example-image' 
                <?php
                if ($stringLocationExists) { ?>
                        src='<?= $stringLocation ?>'>
                <?php } else { ?>
                        src='<?= $src ?>'>
                <?php }
                ?>
            </a>
        </li><?php
}

function displayHome() { 

        echo '<p>Welcome to this collection of our latest photoshoots! Choose a photo gallery from the options above.</p>';
        echo '<h2>Random Image Preview:</h2>';
        
        if (is_dir(GALLERIES_DIRECTORY)) {
                $galleries = scandir(GALLERIES_DIRECTORY);

                $randomNumber = rand(2, count($galleries) - 1);

                if (isset($galleries[$randomNumber])) {
                    
                    $thisGallery = $galleries[$randomNumber];

                    $directoryThisGallery = GALLERIES_DIRECTORY.$thisGallery;

                    if (is_dir($directoryThisGallery)) {
                        
                        $images = scandir($directoryThisGallery);

                        $newRandomNumbers = rand(2, count($images) - 1);
    
                        if (isset($images[$newRandomNumbers])) {

                            $image = $images[$newRandomNumbers];
                            if (imageExists($directoryThisGallery.'/'.$image)) {
                                echo '<p>A sample image from our '.$thisGallery.' gallery, and one image from the DOG API!</p>';
                                echo '<ul class="image-grid">';
                                printImage($thisGallery, $image, 1);
                            } else {
                                echo '<p>Not an image.</p>';
                            }

                        } else {
                            echo '<p>No image to display.</p>';
                        }
                    } else {
                        echo '<p>Not a directory.</p>';
                    }
                } else {
                    echo '<p>Could not find a gallery.</p>';
                }

                $p = file_get_contents('https://dog.ceo/api/breeds/image/random');
                $l = json_decode($p);
                if ($l->status === 'success') {
                    printImage($l->message, $l->message, 0);
                }

                echo '</ul>';
        } else {
                echo '<p>Directory does not exist.</p>';
        }
}