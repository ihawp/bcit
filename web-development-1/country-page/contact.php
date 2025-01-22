<?php

if (!isset($_POST['name'])) {
    header('Location: index.html');
}

$query = htmlspecialchars(stripcslashes($_POST['name']));

?>


<!DOCTYPE html>

<html lang="en">

<head>

    <!-- Meta Tags -->

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="description" content="This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com). This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com). This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com). This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com). This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com).">

    <meta name="keywords" content="Fake Travel Canada, Fake Canada">

    <meta name="author" content="Warren Chemerika" />

    <meta name="robots" content="index, follow">

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta property="og:title" content="Warren Chemerika | ihawp.com">

    <meta property="og:description" content="This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com). This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com). This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com). This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com). This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com).">

    <meta property="og:image" content="media/bg.webp">

    <meta property="og:url" content="https://www.ihawp.com/bcit/web-dev-1/country-page">

    <meta name="twitter:card" content="summary_large_image">

    <meta name="twitter:title" content="Fake Travel Canada by Warren Chemerika">

    <meta name="twitter:description" content="This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com). This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com). This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com). This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com). This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com).">

    <meta name="twitter:image" content="media/bg.webp">

    <meta name="theme-color" content="#26374a">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- Fonts -->

    <link rel="preload" href="fonts/roboto-variablefont_wdthwght-webfont.woff2" as="font" type="font/ttf" crossorigin="anonymous">

    <!-- Styles -->

    <link rel="preload stylesheet" href="css/normalize-fwd.min.css" as="style" type="text/css">

    <link rel="preload stylesheet" href="css/style.css" as="style" type="text/css">

    <!-- Icons -->

    <link rel="icon" as="image" href="media/icon/fake-travel-canada.webp" type="image/x-icon">

    <link rel="apple-touch-icon" as="image" href="media/icon/fake-travel-canada.webp">

    <!-- Title of Page -->

    <title><?php echo $query ?>'s Contact Form Submission</title>

</head>

<body>

<header class="flex-col items-center py-1 pt-1 gap-1">

    <nav aria-label="Main Navigation" class="div-media flex-col items-center gap-1">

        <div class="flex-row justify-between w-full items-center">

            <div class="flex-row items-center gap-1">

                <img src="media/canada-flag.webp" width="90" height="45" alt="Canada Flag" draggable="false" title="Canada Flag" />

                <h2 class="display-sm">Travel Canada</h2>

            </div>

            <ul class="flex-row gap-1 display-sm">

                <li>

                    <a href="" title="Login" class="c-2" aria-label="Login">Login</a>

                </li>

                <li>

                    <p>|</p>

                </li>

                <li>

                    <a href="" title="Register" class="c-2" aria-label="Register">Register</a>

                </li>

                <li>

                    <a href="" title="Francais" class="c-1 px-half py-1 bg-2" aria-label="Francais">Francais</a>

                </li>

            </ul>

            <button id="button-mobile-nav" title="Navigation" aria-label="Navigation" class="b-none bg-none none c-2" >|||</button>

            <button id="button-exit-mobile-nav" title="Navigation" aria-label="Navigation" class="b-none bg-none none c-2" hidden>X</button>

        </div>

        <div class="flex-col-rev-sm-nr w-full gap-1">

            <div id="navigation" class="display-sm bg-2 flex-col-sm gap-1 p-1 flex-grow-1">

                <ul id="navigation-first-ul" class="flex-col-sm gap-1">

                    <li>

                        <a href="index.html" title="Home" class="c-1" aria-label="Home">Home</a>

                    </li>

                    <li>

                        <a href="learn.html" title="Learn" class="c-1" aria-label="Learn">Learn</a>

                    </li>

                    <li>

                        <a href="visit.html" title="Visit" class="c-1" aria-label="Visit">Visit</a>

                    </li>

                    <li>

                        <a href="credit.html" title="Credit" class="c-1" aria-label="Credit">Credit</a>

                    </li>

                </ul>

                <ul class="flex-col gap-1 none">

                    <li>

                        <a href="" title="Login" class="c-1" aria-label="Login">Login</a>

                    </li>

                    <li>

                        <a href="" title="Register" class="c-1" aria-label="Register">Register</a>

                    </li>

                    <li>

                        <a href="" title="Francais" class="c-1" aria-label="Francais">Francais</a>

                    </li>

                </ul>

            </div>

            <div class="flex-row items-center justify-center">

                <ul class="w-full">

                    <li>

                        <form action="search.php" method="post" class="flex-row items-center gap-half">

                            <label for="searchBar" hidden>Search</label>

                            <input id="searchBar" autocomplete="on" class="bc-2 c-2 w-full bs-solid outline-none bw-2" aria-label="Search Bar" name="search" type="text" placeholder="Search" required>

                            <button class="bc-2 bg-2 c-1 bs-solid bw-2 w-third" type="submit" title="Search">Search</button>

                        </form>

                    </li>

                </ul>

            </div>
        </div>
    </nav>
</header>

<main class="flex flex-col">

    <header class="div-media flex-col gap-1 text-center mx-5 p-1">

        <h1 class="font-weight-400">Sorry <span class="text-dec-underline"><?= $query ?></span>, your data will go nowhere.</h1>

    </header>

</main>

<footer class="bg-2 c-1 py-1 px-2 flex-row items-center justify-center">

    <div class="div-media flex-col gap-2">

        <div class="flex-row items-center gap-1">

            <!-- https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg -->

            <img alt="Canada Flag" title="Canada Flag" draggable="false" src="media/canada-flag-alt.webp" loading="lazy" width="69" height="34.5" />

            <h2>Travel Canada</h2>

        </div>

        <div class="flex-col-sm gap-2 flex-wrap basis-auto">

            <nav aria-label="footerNav1" class="flex-grow-1 flex-col gap-half min-width-150">

                <p class="font-weight-600">Home</p>

                <ul class="flex-col gap-half">

                    <li>

                        <a title="Home" href="index.html#" class="c-4">Home</a>

                    </li>

                    <li>

                        <a title="Learn" href="index.html#learn" class="c-4">Learn</a>

                    </li>

                    <li>

                        <a title="Travel" href="index.html#travel" class="c-4">Travel</a>

                    </li>

                    <li>

                        <a title="Frequently Asked Questions" href="index.html#frequently-asked-questions" class="c-4">Frequently Asked Questions</a>

                    </li>

                    <li>

                        <a title="Contact" href="index.html#contact" class="c-4">Contact</a>

                    </li>

                </ul>

            </nav>

            <nav aria-label="footerNav2" class="flex-grow-1 flex-col gap-half min-width-150">

                <p class="font-weight-600">Learn</p>

                <ul class="flex-col gap-half">

                    <li>

                        <a title="Learn" href="learn.html" class="c-4">Learn</a>

                    </li>

                    <li>

                        <a title="Provinces/Territories" href="learn.html#provinces-territories" class="c-4">Provinces/Territories</a>

                    </li>

                    <li>

                        <a title="Popular Cities" href="learn.html#popular-cities" class="c-4">Popular Cities</a>

                    </li>

                    <li>

                        <a title="Anthem" href="learn.html#anthem" class="c-4">Anthem</a>

                    </li>

                    <li>

                        <a title="Frequently Asked Questions" href="#frequently-asked-questions" class="c-4">Frequently Asked Questions</a>

                    </li>

                </ul>

            </nav>

            <nav aria-label="footerNav3" class="flex-grow-1 flex-col gap-half min-width-150">

                <p class="font-weight-600">Visit</p>

                <ul class="flex-col gap-half">

                    <li>

                        <a title="Visit" href="visit.html" class="c-4">Visit</a>

                    </li>

                    <li>

                        <a title="Travel" href="visit.html#travel" class="c-4">Travel</a>

                    </li>

                    <li>

                        <a title="Testimonials" href="visit.html#testimonials" class="c-4">Testimonials</a>

                    </li>

                    <li>

                        <a title="Ready To Book?" href="visit.html#ready-to-book" class="c-4">Ready To Book?</a>

                    </li>

                    <li>

                        <a title="Frequently Asked Questions" href="visit.html#frequently-asked-questions" class="c-4">Frequently Asked Questions</a>

                    </li>

                </ul>

            </nav>

            <nav aria-label="footerNav4" class="flex-grow-1 flex-col gap-half min-width-150">

                <p class="font-weight-600">Credit</p>

                <ul class="flex-col gap-half">

                    <li>

                        <a title="Credit" href="credit.html" class="c-4">Credit</a>

                    </li>

                    <li>

                        <a title="Research" href="credit.html#research" class="c-4">Research</a>

                    </li>

                    <li>

                        <a title="Files" href="credit.html#files" class="c-4">Files</a>

                    </li>

                    <li>

                        <a title="References" href="credit.html#references" class="c-4">References</a>

                    </li>

                    <li>

                        <a title="Frequently Asked Questions" href="credit.html#frequently-asked-questions" class="c-4">Frequently Asked Questions</a>

                    </li>

                </ul>

            </nav>

        </div>

        <div class="flex-col-rev-sm-nr gap-2">

            <div class="flex-col gap-2 flex-grow-1">

                <address class="flex-col gap-half">

                    <p>Parliament Hill<br>

                        Wellington St, Ottawa, ON K1A 0A9<br>

                        Canada</p>

                    <a class="active c-4" rel="noreferrer" href="tel:999-999-9999">999-999-9999</a>

                    <a class="active c-4" rel="noreferrer" href="mailto:canada@canada.ca">canada@canada.ca</a>

                </address>

                <p class="w-full">&copy; Canada 2025.</p>


            </div>

            <div class="text-start-sm flex-col gap-1 flex-grow-1">

                <blockquote>

                    "I love Canada a lot!"<br>

                    <cite class="c-4">- Prime Minister</cite>

                </blockquote>

                <blockquote>

                    "This place is rad!"<br>

                    <cite  class="c-4">- Austin Powers</cite>

                </blockquote>

            </div>

        </div>

    </div>

</footer>

<script src="js/mobileNav.js" type="text/javascript"></script>

</body>

</html>