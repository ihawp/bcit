/*

    Warren Chemerika

    BCIT | Web Scripting 1

    Assignment 4

    -------------

    Some functional programming!

*/

const colourInput = document.querySelectorAll('input[name="shirt-color"]');
const slide = document.getElementById('slide');
const slides = document.querySelectorAll('.slide-thumbnails-container img');
const addToCart = document.getElementById('btn-add-to-cart');
const sizeInput = document.querySelectorAll('input[name="shirt-size"]');
let lastColour = document.getElementById('selected-color-out').innerText.toLowerCase();

colourInput.forEach(item =>
    item.addEventListener('change', updateColourImages)
);

sizeInput.forEach(item =>
    item.addEventListener('change', updateSize)
);

slides.forEach(item =>
    item.addEventListener('mouseover', () => slide.src = item.src)
);

function updateColourImages(event) {

    const text = event.target.nextElementSibling.innerText;
    const color = event.target.value;
    const shirtOptions = {
        'th-no-model': `images/t-shirt-${color}-no-model.jpg`,
        'th-front': `images/t-shirt-${color}-front.jpg`,
        'th-back': `images/t-shirt-${color}-back.jpg`
    }

    slides.forEach((item) => {
        let w = item.parentElement.parentElement.classList[1]
        if (item.src === slide.src) slide.src = shirtOptions[w];
        item.src = shirtOptions[w];
    });
    lastColour = document.getElementById('selected-color-out').innerText = text;
}

function updateSize(event) {
    addToCart.removeAttribute('disabled');
    document.getElementById('selected-size-out').innerText = event.target.nextElementSibling.lastElementChild.innerText;
}