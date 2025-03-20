<!doctype html>

<html lang="en">

<head>

    <!-- Meta Tags -->

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="description"
          content="This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com). This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com). This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com). This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com). This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com).">

    <meta name="keywords" content="Fake Travel Canada, Fake Canada">

    <meta name="author" content="Warren Chemerika">

    <meta name="robots" content="index, follow">

    <meta property="og:title" content="Warren Chemerika | ihawp.com">

    <meta property="og:description"
          content="This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com). This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com). This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com). This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com). This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com).">

    <meta property="og:image" content="media/bg.webp">

    <meta property="og:url" content="https://www.ihawp.com/bcit/web-dev-1/country-page">

    <meta name="twitter:card" content="summary_large_image">

    <meta name="twitter:title" content="Fake Travel Canada by Warren Chemerika">

    <meta name="twitter:description"
          content="This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com). This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com). This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com). This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com). This is a fake website about travelling in Canada create by Warren Chemerika (ihawp@ihawp.com).">

    <meta name="twitter:image" content="media/bg.webp">

    <meta name="theme-color" content="#26374a">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- Fonts -->

    <link rel="preload" href="fonts/roboto-variablefont_wdthwght-webfont.woff2" as="font" type="font/ttf"
          crossorigin="anonymous">

    <!-- Hero Image Script -->

    <!-- Canada Flags -->

    <link rel="preload" href="media/canada-flag.webp" as="image">

    <!-- Styles -->

    <link rel="preload stylesheet" href="css/normalize-fwd.css" as="style" type="text/css">

    <link rel="preload stylesheet" href="css/style.css" as="style" type="text/css">

    <!-- Icons -->

    <link rel="icon" href="media/icon/fake-travel-canada.webp" type="image/x-icon">

    <link rel="apple-touch-icon" href="media/icon/fake-travel-canada.webp">

    <!-- Title of Page -->

    <title>WS2 - Assignment 2</title>

</head>

<?php

include 'data.php';

// Set Timezone 'America/Vancouver'
// date_default_timezone_set('America/Vancouver');
date_default_timezone_set('America/Regina');

/*
 * DATE(): thought about use of strtotime()
*/
$date               = date('Y-m-d H:i:s');
$strToTimeDate      = strtotime($date);
$todaysDate         = date('F d, Y', $strToTimeDate); // Get today's date in 'month day, year' format
$todaysDateForInput = date('Y-m-d', $strToTimeDate); // Get date() for HTML input
$imgDate            = date('A', $strToTimeDate); // Get AM / PM from $date
$imgSrc             = "moon.jpg"; // Set imgSrc variable (may be changed)

/*
 * A question:
 *
 * In this section I first built everything just using new date() calls for each line:
 * $todaysDate = date('F d, Y');
 * $todaysDateForInput = date('Y-m-d');
 *
 * Is it more efficient to use strtotime() on one original date() (as I have turned in here)?
 * $date = date('d-m-Y H:i:s');
 * $todaysDate = date('F d, Y', strtotime($date));
 * $todaysDateForInput = date('Y-m-d', strtotime($date));
 *
 * What I really thought was that it just made more sense...
 * Creating multiple timestamps likely creates different values...
 * Seeing as seconds can matter for 'things' and the possibility of a
 * users page loading between 11:59 PM and 12:00 AM, I thought the one
 * timestamp would be more realistic and consistent.
*/

/*
 * Update img based on AM or PM
*/
if ($imgDate === 'AM') $imgSrc = "sun.jpg";

/*
 * RAND():
*/
$string1            = "We simply attempt to be fearful when others are greedy and to be greedy only when others are fearful.";
$string2            = "You only get one mind and one body. And it’s got to last a lifetime.";
$string3            = "The trick is, when there is nothing to do, do nothing.";
$arrayOfStrings     = [$string1, $string2, $string3];
$printableString    = $arrayOfStrings[rand(0, count($arrayOfStrings) - 1)];


/*
 * STRING:
*/

$stringToLower      = strtolower($message);
$ucFirst            = ucfirst($stringToLower);
$ucWords            = ucwords($ucFirst);

?>

<body>

<nav aria-label="Skip To Content">

    <a href="#hero-image-container" class="screen-reader-text" title="Skip To Content">Skip To Content</a>

</nav>

<header class="flex-col items-center py-1 pt-1 gap-1">

    <nav aria-label="Main Navigation" class="div-media flex-col items-center gap-1">

        <div class="flex-row justify-between w-full items-center">

            <div class="flex-row items-center gap-1">

                <img src="media/canada-flag.webp" width="90" height="45" alt="Canada Flag" draggable="false"
                     title="Canada Flag">

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

            <button id="button-mobile-nav" title="Navigation" aria-label="Navigation" class="b-none bg-none none c-2">
                |||
            </button>

            <button id="button-exit-mobile-nav" title="Navigation" aria-label="Navigation"
                    class="b-none bg-none none c-2" hidden>X
            </button>

        </div>

        <div class="flex-col-rev-sm-nr w-full gap-1">

            <div id="navigation" class="display-sm bg-2 flex-col-sm gap-1 p-1 flex-grow-1">

                <ul id="navigation-first-ul" class="flex-col-sm gap-1">

                    <li>

                        <a href="index.html" title="Home" class="c-1 active" aria-label="Home">Home</a>

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

                            <input id="searchBar" autocomplete="on" class="bc-2 c-2 w-full bs-solid outline-none bw-2"
                                   aria-label="Search Bar" name="search" type="text" placeholder="Search" required>

                            <button class="bc-2 bg-2 c-1 bs-solid bw-2 w-third" type="submit" title="Search">Search
                            </button>

                        </form>

                    </li>

                </ul>

            </div>
        </div>
    </nav>
</header>

<main class="flex-col gap-1 p-1">

    <noscript class="div-media">

        <p class="text-center bg-3 px-1 c-1">Please enable JavaScript for a more optimal experience.</p>

    </noscript>

    <header class="div-media flex-col gap-1">

        <h1 class="bg-2 c-1 p-1 text-center">WS2 - Assignment 2</h1>

        <div id="hero-image-container" class="h-2">
            <img class="h-2 w-full object-cover" src="media/<?= $imgSrc ?>" alt="Hero Image">
        </div>

    </header>

    <section class="bg-2 c-1 p-2 flex flex-col gap-1 text-start">

        <h2>About Todays date():</h2>

        <p>Todays Date: <?= $todaysDate ?></p>

        <p>You were born on: <?= $birthMonth ?> <?= $birthDay ?></p>

        <p class="bg-1 c-2 p-1"><?php

            $comparison = $birthMonth.'-'.$birthDay == date('F-d', $strToTimeDate);

            if ($comparison) {

                ?>Happy Birthday!<br><br>Have an awesome day!<?php

            } else {

                ?>It is just another day<?php

            }

        ?></p>

        <form action="#" method="POST" id="partyForm" class="w-full flex flex-col gap-1">

            <?php if ($comparison) echo '<h3>Book a Party!</h3>'; ?>

            <label for="date">Pick a Date:</label>

            <input id="date" type="date" value="<?= $todaysDateForInput ?>" min="<?= $todaysDateForInput ?>" required>

            <?php if ($comparison) echo '<button type="submit">Book Now!</button>'; ?>

        </form>

    </section>

    <section class="bg-2 c-1 p-2 flex flex-col gap-1 text-start">

        <h2>A Quote from Warren Buffett:</h2>

        <p>"<?= $printableString ?>"</p>

        <p>- Warren Buffett</p>

    </section>

    <section class="bg-2 c-1 p-2 flex flex-col gap-1 text-start">

        <h2>Handling Strings:</h2>

        <p>Original String: <?= $message ?></p>

        <p>$stringToLower = strtolower($message): <?= $stringToLower ?></p>

        <p>$ucFirst = ucfirst($stringToLower): <?= $ucFirst ?></p>

        <p>$ucWords = ucwords($ucFirst): <?= $ucWords ?></p>

    </section>

    <!-- Want to Learn About Canada? -->

    <section id="learn" class="flex-col items-center justify-center text-center inverted">

        <div class="flex flex-col justify-center items-center text-center py-1 px-2 gap-1">

            <h2>Want to Learn About Canada's Provinces and Territories?</h2>

            <a href="learn.html" class="c-4 active" title="Link to About page">Learn more about Canada.</a>

        </div>

    </section>

    <!-- Do You Want to Travel to Canada? -->

    <section id="travel" class="flex-col items-center justify-center text-center">

        <div class="flex flex-col justify-center items-center text-center p-1 mx-1 gap-1">

            <h2>Do You Want to Travel to Canada?</h2>

            <a href="visit.html" class="bg-2 bs-solid bc-2 c-1 p-half">Yes, I do!</a>

        </div>

    </section>

    <!-- FAQ -->

    <section id="frequently-asked-questions" class="flex-col gap-1">

        <h2>Frequently Asked Questions</h2>

        <ul id="faq" class="flex flex-col"></ul>

    </section>

    <!-- Contact Form -->

    <section id="contact" class="flex-col-md mx-2 gap-2">

        <div class="flex flex-col w-100-m-50 gap-1">

            <h2>Have a more specific question?</h2>

            <p>Fill out our contact form, and we will make sure to get back to you real quick. Customer service is our
                top priority. We love people!</p>

            <p>Responses to inquiries are sent every weekday from 8am - 4pm.</p>

        </div>

        <form action="contact.php" id="contactForm" method="post" class="w-100-m-50 flex flex-col gap-half">

            <h2 class="mb-half">Contact Us</h2>

            <div class="flex flex-col-md gap-half">

                <label for="contactName" hidden>Name</label>

                <input id="contactName" autocomplete="on" type="text" title="Name" name="name"
                       aria-label="Contact Form: Name" placeholder="Name"
                       class="outline-none bw-2 bs-solid bc-2 p-1 w-full" required>

                <label for="contactEmail" hidden>Email</label>

                <input id="contactEmail" autocomplete="on" type="email" title="Email" name="email"
                       aria-label="Contact Form: Email" placeholder="Email"
                       class="outline-none bw-2 bs-solid bc-2 p-1 w-full" required>

            </div>

            <div class="flex gap-half">

                <label for="contactMessage" hidden>Message</label>

                <textarea id="contactMessage" title="Message" name="message" aria-label="Contact Form: Message"
                          placeholder="Message" class="outline-none bw-2 bs-solid bc-2 p-1 w-full" required></textarea>

            </div>

            <button type="submit" title="Submit" aria-label="Contact Form: Submit"
                    class="bw-2 bs-solid bc-2 bg-2 c-1 p-1">Submit
            </button>

        </form>

    </section>

</main>

<footer class="bg-2 c-1 py-1 px-2 flex-row items-center justify-center">

    <div class="div-media flex-col gap-2">

        <div class="flex-row items-center gap-1">

            <img alt="Canada Flag" title="Canada Flag" draggable="false" src="media/canada-flag-alt.webp" loading="lazy"
                 width="69" height="35">

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

                        <a title="Frequently Asked Questions" href="index.html#frequently-asked-questions" class="c-4">Frequently
                            Asked Questions</a>

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

                        <a title="Frequently Asked Questions" href="#frequently-asked-questions" class="c-4">Frequently
                            Asked Questions</a>

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

                        <a title="Frequently Asked Questions" href="visit.html#frequently-asked-questions" class="c-4">Frequently
                            Asked Questions</a>

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

                        <a title="Frequently Asked Questions" href="credit.html#frequently-asked-questions" class="c-4">Frequently
                            Asked Questions</a>

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

                    <cite class="c-4">- Austin Powers</cite>

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
            summary: "What are the must-try Canadian foods?",

            details: [
                "Poutine is a must! Fries, cheese curds, and gravy—what's not to love? Just don’t ask for a salad on the side; it’s not on the menu!",

                "Maple syrup is basically a food group here. Pour it on everything from pancakes to bacon, and don’t forget to take a bottle home as a souvenir!",

                "BeaverTails are a delicious pastry that you can’t miss. They’re not made from actual beavers, we promise! Just think of them as a sweet, doughy hug."
            ],
        },

        {
            summary: "What are the best outdoor activities in Canada?",

            details: [
                "Hiking is a national pastime! With stunning trails from coast to coast, just remember to pack snacks—nature is hungry work!",

                "Skiing and snowboarding in the Rockies are a must during winter. Just be prepared for the occasional faceplant in the snow—it's all part of the experience!",

                "In the summer, canoeing in one of our many lakes is a great way to enjoy the scenery. Just watch out for the occasional moose trying to steal your paddle!"
            ],
        },

        {
            summary: "What is the weather like in Canada?",

            details: [
                "Canada has a bit of everything! Expect snow in winter, rain in spring, sunshine in summer, and a beautiful display of colors in fall. Bring your entire wardrobe!",

                "In some parts, it can get really cold—like, 'your breath freezes mid-sentence' cold. So, pack your warmest gear and maybe a heated blanket!",

                "Don’t forget about the famous Canadian 'heat wave'—which is basically anything above 25°C (77°F). We might just break out the shorts and flip-flops!"
            ],
        },

        {
            summary: "Are there any unique Canadian customs I should know about?",

            details: [
                "Tipping is customary, usually around 15-20%. But if you’re feeling extra generous, you might just earn yourself a Canadian hug!",

                "When in doubt, just say 'eh' at the end of your sentences. It’s a great way to fit in and shows you’re embracing your inner Canadian!",

                "Don’t be surprised if you find yourself in a conversation about the weather. It’s our favorite small talk topic—right up there with hockey!"
            ],
        },
    ];

    new FAQ(data);

</script>

</body>

</html>

