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

// add event listeners to colours.
red.addEventListener('click', click);
grey.addEventListener('click', click);
black.addEventListener('click', click);

// add size event listeners.
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

// deal with colour click!
function click(event) {
    let l = event.target.id.split('-');
    let colour = l[l.length - 1];
    colourOutput.innerText = colour[0].toUpperCase() + colour.substring(1, colour.length);
    setSlides(images[event.target.id]);
}

// set the slides when new colour is chosen.
function setSlides(images) {
    slides.forEach((item, key) => {
        let indexed = images[key];
        let image = 'images/' + indexed.src;
        if (key === current) {
            slideContainer.firstElementChild.src = image;
            slideContainer.firstElementChild.alt = indexed.alt;
        }
        item.src = image;
        item.alt = indexed.alt;
    });
}

// deal with size change.
function changeSize(event) {
    addToCart.removeAttribute('disabled');
    addToCart.value = 'Add To Cart';
    // split the id of the size button, then split the 4th index into individual
    // characters and use the first character as innerText of size span
    let l = event.target.id.split('-');
    // https://www.measurethat.net/Benchmarks/Show/7476/0/char-index-vs-charat-vs-slice#:~:text=In%20modern%20JavaScript%20engines%2C%20the,that%20need%20to%20be%20modified.
    selectedSize.innerText = l[l.length - 1][0].toUpperCase();
}

// preload next colour images upon mouseover of colour!
function preload(event) {
    let id = event.target.firstElementChild.id;
    addLink(id, 0);
    addLink(id, 1);
    addLink(id, 2);
}

function addLink(id, index) {
    let l = document.createElement("link");
    l.rel = 'preload';
    l.as = 'image';
    l.href = `images/${images[id][index].src}`;
    document.head.appendChild(l);
}

let bananaPhone = document.querySelectorAll('.form-group-color div.form-item');
bananaPhone[1].addEventListener('mouseenter', preload, { once: true });
bananaPhone[2].addEventListener('mouseenter', preload, { once: true });
