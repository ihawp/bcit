<?php

if (!isset($_POST['search'])) {
    header('Location: index.html');
}

$query = htmlspecialchars(stripcslashes($_POST['search']));

?>


<!doctype html>

<html lang="en">

<head>

    <!-- Meta Tags -->

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="description" content="This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com). This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com). This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com). This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com). This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com).">

    <meta name="keywords" content="Fake Travel Canada, Fake Canada">

    <meta name="author" content="Warren Chemerika">

    <meta name="robots" content="index, follow">

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

    <!-- Canada Flags -->

    <link rel="preload" href="media/canada-flag.webp" as="image">

    <!-- Styles -->

    <link rel="preload stylesheet" href="css/normalize-fwd.min.css" as="style" type="text/css">

    <link rel="preload stylesheet" href="css/style.css" as="style" type="text/css">

    <!-- Icons -->

    <link rel="icon" href="media/icon/fake-travel-canada.webp" type="image/x-icon">
    <link rel="apple-touch-icon" href="media/icon/fake-travel-canada.webp">

    <!-- Title of Page -->

    <title>Search Results: <?php echo $query; ?> | Travel Canada</title>

</head>

<body>

<header class="flex-col items-center py-1 pt-1 gap-1 p-1">

    <nav aria-label="Main Navigation" class="div-media flex-col items-center gap-1">

        <div class="flex-row justify-between w-full items-center">

            <div class="flex-row items-center gap-1">

                <img src="media/canada-flag.webp" width="90" height="45" alt="Canada Flag" draggable="false" title="Canada Flag">

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

<main class="flex-col p-1">

    <!-- Search Result -->

    <header class="div-media flex-col gap-1">

        <h1 class="bg-2 c-1 p-1 text-center">Search Results</h1>

    </header>

    <section class="div-media flex-col text-center mx-5">

        <h2 class="font-weight-400">Your search for "<?= $query ?>" returned 0 results.</h2>

    </section>

    <!-- FAQ -->

    <section id="frequently-asked-questions" class="flex-col gap-1">

        <h2>Frequently Asked Questions</h2>

        <ul id="faq" class="flex flex-col"></ul>

    </section>

    <!-- Contact Form -->
    <section class="flex-col-md mx-2 gap-2">

        <div class="flex flex-col w-100-m-50 gap-1">

            <h2>Have a more specific question?</h2>

            <p>Fill out our contact form, and we will make sure to get back to you real quick. Customer service is our top priority. We love people!</p>

            <p>Responses to inquiries are sent every weekday from 8am - 4pm.</p>

        </div>

        <form action="contact.php" id="contactForm" method="post" class="w-100-m-50 flex flex-col gap-half">

            <h2 class="mb-half">Contact Us</h2>

            <div class="flex flex-col-md gap-half">

                <label for="contactName" hidden>Name</label>

                <input id="contactName" autocomplete="on" type="text" title="Name" name="name" aria-label="Contact Form: Name" placeholder="Name" class="outline-none bw-2 bs-solid bc-2 p-1 w-full" required>

                <label for="contactEmail" hidden>Email</label>

                <input id="contactEmail" autocomplete="on" type="email" title="Email" name="email" aria-label="Contact Form: Email" placeholder="Email" class="outline-none bw-2 bs-solid bc-2 p-1 w-full" required>

            </div>

            <div class="flex gap-half">

                <label for="contactMessage" hidden>Message</label>

                <textarea id="contactMessage" title="Message" name="message" aria-label="Contact Form: Message" placeholder="Message" class="outline-none bw-2 bs-solid bc-2 p-1 w-full" required></textarea>

            </div>

            <button type="submit" title="Submit" aria-label="Contact Form: Submit" class="bw-2 bs-solid bc-2 bg-2 c-1 p-1">Submit</button>

        </form>

    </section>

</main>

<footer class="bg-2 c-1 py-1 px-2 flex-row items-center justify-center">

    <div class="div-media flex-col gap-2">

        <div class="flex-row items-center gap-1">

            <!-- https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg -->

            <img alt="Canada Flag" title="Canada Flag" draggable="false" src="media/canada-flag-alt.webp" loading="lazy" width="69" height="35">

            <h2>Travel Canada</h2>

        </div>

        <div class="flex-col-sm gap-2 flex-wrap basis-auto">

            <nav aria-label="Footer Home Navigation" class="flex-grow-1 flex-col gap-half min-width-150">

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

            <nav aria-label="Footer Learn Navigation" class="flex-grow-1 flex-col gap-half min-width-150">

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

            <nav aria-label="Footer Visit Navigation" class="flex-grow-1 flex-col gap-half min-width-150">

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

            <nav aria-label="Footer Credit Navigation" class="flex-grow-1 flex-col gap-half min-width-150">

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

<script src="js/mobileNav.js"></script>

<script src="js/faq.js"></script>

<script>

    const data = [
        {
            summary: "Why can't I find any search results?",

            details: [
                "Well, it seems our search function is on a permanent vacation! It might be sipping hot chocolate in the Rockies while you’re here looking for answers.",

                "Our search bar is like a Canadian winter—full of potential but often just a little too cold to function properly. Try again later, eh?",

                "If you’re looking for results, you might have better luck asking a friendly moose for directions. They’re surprisingly knowledgeable about local attractions!"
            ],
        },

        {
            summary: "Is there a secret to getting better search results?",

            details: [
                "Absolutely! Try typing in 'Canada' instead of 'that place with the maple syrup and hockey.' It’s a game changer!",

                "If all else fails, just type 'poutine' and hope for the best. It’s the universal keyword for all things Canadian—results may vary!",

                "Remember, our search function is like a Canadian winter: unpredictable. Sometimes it works, and sometimes it just wants to hibernate!"
            ],
        },

        {
            summary: "What should I do if I can't find what I'm looking for?",

            details: [
                "Consider sending a carrier pigeon! They’re great at delivering messages, and they might just find the information you need—eventually.",

                "You could also try consulting a crystal ball. It’s not guaranteed, but it might be more reliable than our search function!",

                "If all else fails, just grab a cup of Tim Hortons coffee and relax. Sometimes the best discoveries happen when you’re not looking!"
            ],
        },

        {
            summary: "Can I blame the search function for my lack of results?",

            details: [
                "Of course! Our search function is like a polite Canadian—always ready to apologize for not delivering what you need. Just don’t take it too personally!",

                "Feel free to write a strongly worded letter to our search function. Just remember to include a maple syrup bribe; it works wonders!",

                "In the end, it’s not you; it’s our search function. It’s just a little shy and prefers to keep things mysterious!"
            ],
        },
    ];

    new FAQ(data);

</script>

</body>

</html>