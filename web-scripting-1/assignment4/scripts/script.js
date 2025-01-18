/*

    Warren Chemerika
    BCIT | Web Scripting 1
    Assignment 4

    -------------

    Some functional programming!

 */

// change the slides from whatever they are..?!
const slides = document.querySelectorAll('.th a img');
const slideContainer = document.querySelector('.slide-container');
let current = 0;
slides.forEach((item, key) => {
    item.addEventListener('mouseover', () => {
        current = key;
        slideContainer.innerHTML = item.outerHTML;
    })
});

// change images based on colour selection

const red = document.getElementById('t-shirt-color-red');
const grey = document.getElementById('t-shirt-color-grey');
const black = document.getElementById('t-shirt-color-black');

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

function click(event) {
    setSlides(images[event.target.id]);
}

function setSlides(images) {
    slides.forEach((item, key) => {
        let indexed = images[key];
        let image = 'images/' + indexed.src;
        if (key === current) slideContainer.firstElementChild.src = image;
        item.src = image;
        item.alt = indexed.alt;
    });
}

// add event listeners to colours
red.addEventListener('click', click);
grey.addEventListener('click', click);
black.addEventListener('click', click);


// size selection
const small = document.getElementById('t-shirt-size-small');
const medium = document.getElementById('t-shirt-size-medium');
const large = document.getElementById('t-shirt-size-large');
const addToCart = document.getElementById('btn-add-to-cart');
const selectedSize = document.getElementById('selected-size-out');

small.addEventListener('click', wow);
medium.addEventListener('click', wow);
large.addEventListener('click', wow);

function wow(event) {
    addToCart.removeAttribute('disabled');
    addToCart.value = 'Add To Cart';

    // split the id of the size button, then split the 4th index into individual
    // characters and use the first character as innerText of size span
    let l = event.target.id.split('-')[3].split('');

    selectedSize.innerText = l[0].toUpperCase();
}