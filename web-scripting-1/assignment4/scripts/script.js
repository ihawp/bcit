/*

    Warren Chemerika
    BCIT | Web Scripting 1
    Assignment 4

 */

// change the slides from whatever they are..?!
const slides = document.querySelectorAll('.th a img');
const slideContainer = document.querySelector('.slide-container');
slides.forEach((item) => {
    item.addEventListener('mouseover', () => {
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
    },
}

// deal with click of colour
function click(event) {
    setSlides(images[event.target.id]);
}

function setSlides(images) {
    slides.forEach((item, key) => {
        let image = 'images/' + images[key];
        if (key === 0) slideContainer.firstElementChild.src = image;
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

small.addEventListener('click', wow);
medium.addEventListener('click', wow);
large.addEventListener('click', wow);

function wow() {

}



