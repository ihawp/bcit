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
slides.forEach((item) => {
    item.addEventListener('mouseover', () => {
        switch () {

        }
        slideContainer.innerHTML = item.outerHTML;
    })
});

// change images based on colour selection

const red = document.getElementById('t-shirt-color-red');
const grey = document.getElementById('t-shirt-color-grey');
const black = document.getElementById('t-shirt-color-black');

const images = {
    't-shirt-color-black': {
        0: 't-shirt-black-no-model.jpg',
        1: 't-shirt-black-front.jpg',
        2: 't-shirt-black-back.jpg'
    },
    't-shirt-color-red': {
        0: 't-shirt-red-no-model.jpg',
        1: 't-shirt-red-front.jpg',
        2: 't-shirt-red-back.jpg'
    },
    't-shirt-color-grey': {
        0: 't-shirt-grey-no-model.jpg',
        1: 't-shirt-grey-front.jpg',
        2: 't-shirt-grey-back.jpg'
    }
}

function click(event) {
    setSlides(images[event.target.id]);
}

function setSlides(images) {
    slides.forEach((item, key) => {
        let image = 'images/' + images[key];
        if (key === current) slideContainer.firstElementChild.src = image;
        item.src = image;
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



