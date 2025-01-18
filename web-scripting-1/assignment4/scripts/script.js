/*

    Warren Chemerika
    BCIT | Web Scripting 1
    Assignment 4

    -------------

    Some functional programming!

 */

// main image hover slides.
const slides = document.querySelectorAll('.th a img');
const slideContainer = document.querySelector('.slide-container');
let current = 0;

// colour selection.
const red = document.getElementById('t-shirt-color-red');
const grey = document.getElementById('t-shirt-color-grey');
const black = document.getElementById('t-shirt-color-black');
let colourOutput = document.getElementById('selected-color-out')

// size selection.
const small = document.getElementById('t-shirt-size-small');
const medium = document.getElementById('t-shirt-size-medium');
const large = document.getElementById('t-shirt-size-large');
const addToCart = document.getElementById('btn-add-to-cart');
const selectedSize = document.getElementById('selected-size-out');

// image data: src / alt.
const images = {
    't-shirt-color-black': {
        0: {
            src: 't-shirt-black-no-model.jpg',
            alt: 'Black T-Shirt No Model'
        },
        1: {
            src: 't-shirt-black-front.jpg',
            alt: 'Black T-Shirt Front'
        },
        2: {
            src: 't-shirt-black-back.jpg',
            alt: 'Black T-Shirt Front'
        },
    },
    't-shirt-color-red': {
        0: {
            src: 't-shirt-red-no-model.jpg',
            alt: 'Red T-Shirt No Model'
        },
        1: {
            src: 't-shirt-red-front.jpg',
            alt: 'Red T-Shirt Front'
        },
        2: {
            src: 't-shirt-red-back.jpg',
            alt: 'Red T-Shirt Front'
        },
    },
    't-shirt-color-grey': {
        0: {
            src: 't-shirt-grey-no-model.jpg',
            alt: 'Grey T-Shirt No Model'
        },
        1: {
            src: 't-shirt-grey-front.jpg',
            alt: 'Grey T-Shirt Front'
        },
        2: {
            src: 't-shirt-grey-back.jpg',
            alt: 'Grey T-Shirt Front'
        },
    }
}

// Add 'click' event listeners to colour buttons
red.addEventListener('click', changeColour);
grey.addEventListener('click', changeColour);
black.addEventListener('click', changeColour);

// Add 'click' event listeners to size buttons
small.addEventListener('click', changeSize);
medium.addEventListener('click', changeSize);
large.addEventListener('click', changeSize);

// update main image on slide 'mouseover'.
slides.forEach((item, key) => {
    item.addEventListener('mouseover', () => {
        current = key;
        slideContainer.innerHTML = item.outerHTML;
    })
});

// Function added to event listener 'click' for
// colour selection buttons
function changeColour(event) {

    // Split the id to begin getting the colour
    let l = event.target.id.split('-');

    // Get last element of split string array
    let colour = l[l.length - 1];

    // Set the colour output to be formatted as first letter uppercase
    colourOutput.innerText = colour[0].toUpperCase() + colour.substring(1, colour.length);

    // Set the new images using the setSlides() function
    setSlides(images[event.target.id]);
}

// Set all images when a new colour is chosen to view
function setSlides(images) {
    // Iterate through slides array using param info
    // to properly update DOM data
    slides.forEach((item, key) => {
        // Use key (index of loop) to get proper images sub-array
        let indexed = images[key];

        // Set a formatted link to the image
        let image = 'images/' + indexed.src;

        // Set the main image if the current index of type of image
        // matches the one being viewed as the main image currently
        if (key === current) {
            // Set the image link
            slideContainer.firstElementChild.src = image;
            // Set the alt tag
            slideContainer.firstElementChild.alt = indexed.alt;
        }
        // Set the slide images (everytime)
        // Set the image link
        item.src = image;
        // Set the alt tag
        item.alt = indexed.alt;
    });
}

// Change the text displayed as the current selected size
function changeSize(event) {
    // Enable the "Choose A Size"/"Add To Cart" Button
    addToCart.removeAttribute('disabled');

    // Change value of "Choose A Size"/"Add To Cart" Button
    addToCart.value = 'Add To Cart';

    // Split the id of the size button used to get size
    let l = event.target.id.split('-');
    // https://www.measurethat.net/Benchmarks/Show/7476/0/char-index-vs-charat-vs-slice#:~:text=In%20modern%20JavaScript%20engines%2C%20the,that%20need%20to%20be%20modified.
    // Get the first character of the last item in split id array
    // (the size) use toUpperCase and input the character as the
    // innerText of the selected size <span>
    selectedSize.innerText = l[l.length - 1][0].toUpperCase();
}

function preload(event) {
    let id = event.target.firstElementChild.id;
    addLink(id, 0);
    addLink(id, 1);
    addLink(id, 2);
}

function addLink(id, index) {
    // https://www.w3schools.com/jsref/met_document_createelement.asp
    let l = document.createElement("link");
    l.rel = 'preload';
    l.as = 'image';
    l.href = `images/${images[id][index].src}`;
    document.head.appendChild(l);
}

let bananaPhone = document.querySelectorAll('.form-group-color div.form-item');
bananaPhone[1].addEventListener('mouseenter', preload, { once: true });
bananaPhone[2].addEventListener('mouseenter', preload, { once: true });
