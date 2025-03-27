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

    <!-- Hero Image Script -->

    <link rel="preload" href="js/heroImage.js" type="text/javascript" as="script">

    <script src="js/heroImage.js"></script>

    <!-- Canada Flags -->

    <link rel="preload" href="media/canada-flag.webp" as="image">

    <!-- Styles -->

    <link rel="preload stylesheet" href="css/normalize-fwd.css" as="style" type="text/css">

    <link rel="preload stylesheet" href="css/style.css" as="style" type="text/css">

    <link rel="preload stylesheet" href="special-days.css" as="style" type="text/css">

    <!-- Icons -->

    <link rel="icon" href="media/icon/fake-travel-canada.webp" type="image/x-icon">

    <link rel="apple-touch-icon" href="media/icon/fake-travel-canada.webp">

    <!-- Title of Page -->

    <title>WS2 - Assignment 5</title>

</head>
<body>

<nav aria-label="Skip To Content">

    <a href="#hero-image-container" class="screen-reader-text" title="Skip To Content">Skip To Content</a>

</nav>

<header class="flex-col items-center py-1 pt-1 gap-1">

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

                            <input id="searchBar" autocomplete="on" class="bc-2 c-2 w-full bs-solid outline-none bw-2" aria-label="Search Bar" name="search" type="text" placeholder="Search" required>

                            <button class="bc-2 bg-2 c-1 bs-solid bw-2 w-third" type="submit" title="Search">Search</button>

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

        <h1 class="bg-2 c-1 p-1 text-center">WS2 - Assignment 5</h1>

        <div id="hero-image-container" class="h-2"></div>

    </header>

    <section class="bg-2 c-1 py-2 px-2 flex flex-col gap-1 text-center"><?php

        include ("functions.php");

        // Check if the required POST values have been posted
        // Check existence checks isset() and !empty() with $_POST[$string]
        $firstNameExistence = checkExistence('first-name');
        $lastNameExistence = checkExistence('last-name');
        $studentNumberExistence = checkExistence('student-number');
        $genderExistence = checkExistence('gender');

        /*

        if (!$firstNameExistence && !$lastNameExistence && !$studentNumberExistence && !$genderExistence) {
            header('Location: index.html');
        }

        */

        // Because HTML can be changed (and the pattern on the input could be removed)
        // Regular Expression is rechecked here using preg_match to totally verify the inputted value.
        // $studentNumberExistence is set to false if there is no match, allowing for different cases in error handling)
        // $studentNumberExistence would be 0 if they had not inputted a value
        if ($studentNumberExistence) {
            $studentNumber = cleanString($_POST['student-number']);
            $studentNumberPregMatch = preg_match('/^a0[0-9]{7}$/i', $studentNumber);
            if (!$studentNumberPregMatch) {
                $studentNumberExistence = false;
            }
        }

        // Evaluate '...Existence' variables to determine empty values
        if ($firstNameExistence && $lastNameExistence && $studentNumberExistence && $genderExistence) {
            
            // POST values and clean strings (htmlspecialchars, trim, stripslashes)
            $firstName = cleanString($_POST['first-name']);
            $lastName = cleanString($_POST['last-name']);
            $gender = cleanString($_POST['gender']);

            // Display some messages
            echo '<h2 class="bg-1 c-2 px-1">Marvelous</h2>';
            echo '<p>You have successfully submitted the form. Thank you!</p>';

            // Use switch case to determine name prefix based on the string $gender 
            // (would use index numbers for value=""; for simplicity I 
            // used strings here)
            switch ($gender) {
                case 'male':
                    $gender = 'Mr.';
                    break;
                case 'female':
                    $gender = 'Ms.';
                    break;
                case 'non-binary':
                    $gender = 'citizen';
                    break;
            }

            // Display some message
            echo '<p>Hello '.$gender.' '.formatString($firstName).' '.formatString($lastName).'</p>';

            // Checkbox checking
            $count = 0;
            $buildUl = '';

            // After determining that a value has been posted for that key
            // a string is create from template and added to $buildUl for later printing
            if (checkExistence('healthy')) {
                $buildUl = $buildUl.'<li>'.cleanString($_POST['healthy']).'</li>';
                $count++;
            }
            if (checkExistence('wealthy')) {
                $buildUl = $buildUl.'<li>'.cleanString($_POST['wealthy']).'</li>';
                $count++;
            }
            if (checkExistence('wise')) {
                $buildUl = $buildUl.'<li>'.cleanString($_POST['wise']).'</li>';
                $count++;
            }

            // If the count is not 0 after checking all checkboxes then some checkboxes were checked
            // and we can print the built <ul> from $buildUl
            if ($count !== 0) {
                echo '<p class="font-weight-600">You are:</p>';
                echo '<ul>'.$buildUl.'</ul>';
            }

            // Create message variable
            $message = 'Chin up!';

            switch ($count) {
                case 1:
                    $message = "Gee, that's swell!";
                    break;
                case 2:
                    $message = 'Glad to hear it! Keep it up!';
                    break;
                case 3:
                    $message = "WOW! That's great!";
                    break;
            }

            echo '<p>'.$message.'</p>';
        } else {
            // Check '...Existence' variables individually
            // to echo info on specific error cases.
            echo '<h2 class="bg-1 c-2 px-1">Error!</h2>';
            if (!$firstNameExistence) {
                echo '<p>You did not input a first name.</p>';
            }
            if (!$lastNameExistence) {
                echo '<p>You did not input a last name.</p>';
            }
            if ($studentNumberExistence === 0) {
                echo '<p>You did not input a student number.</p>';
            }
            if ($studentNumberExistence === false) {
                echo '<p>You did not input a student number in the proper format.</p>';
            }
            if (!$genderExistence) {
                echo '<p>You did not input a gender.</p>';
            }
        }

        // Display a link to form/index.html
        echo '<a class="c-1" href="index.html" title="Try Again!">Try the form again..</a>';

    ?></section>

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

            summary: "What are the entry requirements for Canada?",

            details: [

                "Your passport must be valid at the time of entry. No, a selfie with a maple leaf won't cut it!",

                "A tourist visa is not required for stays under 180 days for many nationalities. But if you plan to stay longer, you might want to consider a permanent residency... or just marry a Canadian!",

                "At least one blank page is required in your passport for entry stamps. We need room for all the 'I love Canada' stickers and the occasional moose autograph!"

            ],

        },

        {

            summary: "What should I pack for my trip to Canada?",

            details: [

                "Layers, layers, layers! Canada has four seasons: almost winter, winter, still winter, and construction. Bring your best parka and a swimsuit, just in case!",

                "Don't forget your sense of humor! You'll need it when you try to understand our obsession with poutine and why we put ketchup on everything.",

                "A good pair of snow boots is essential. Unless you want to experience the 'Canadian ice dance' firsthand—trust us, it’s not as graceful as it sounds!"

            ],

        },

        {

            summary: "Is it true that Canadians say 'sorry' a lot?",

            details: [

                "Absolutely! We apologize for everything, even if it’s not our fault. 'Sorry' is basically our national anthem, sung in harmony with a side of maple syrup.",

                "If you bump into a Canadian, expect a heartfelt apology and a cup of hot chocolate as a peace offering. We take our apologies very seriously!",

                "Just remember, if you hear 'sorry' while in Canada, it’s not an apology; it’s a greeting! Kind of like saying 'hello' but with extra politeness."

            ],

        },

        {

            summary: "What’s the best way to see the Northern Lights?",

            details: [

                "Find a cozy spot, preferably with a hot chocolate in hand, and wait for the sky to do its disco dance. Bonus points if you can convince a moose to join you!",

                "Dress warmly! The Northern Lights are beautiful, but so is your ability to feel your toes. Don’t let frostbite ruin your Instagram moment!",

                "If you can’t see the lights, just blame it on the clouds. They’re always hogging the spotlight, and we’re pretty sure they’re in cahoots with the weather gods!"

            ],

        },

    ];

    new FAQ(data);

</script>

</body>

</html>