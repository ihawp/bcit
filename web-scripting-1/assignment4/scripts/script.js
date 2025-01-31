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

colourInput.forEach(function(item) {
    item.addEventListener('change', colour);
});

sizeInput.forEach(function(item) {
    item.addEventListener('change', size);
});

slides.forEach((item) => {
    item.addEventListener('mouseover', () => slide.src = item.src);
});

function colour(event) {
    slides.forEach((item) => {

        let p = item.src.split('/');
        let q = p[7].split('-');
        let newP = '';

        q[2] = event.target.value;

        p.forEach((item, key) => {
            if (key !== p.length - 1) {
                newP += item + '/';
            }
        });

        q.forEach((item, key) => {
            newP += item;
            if (key !== q.length - 1) {
                newP += '-';
            }
        });

        if (item.src === slide.src) {
            slide.src = newP;
        }
        item.src = newP;

    });
    document.getElementById('selected-color-out').innerText = event.target.nextElementSibling.innerText;
}

function size(event) {
    addToCart.removeAttribute('disabled');
    document.getElementById('selected-size-out').innerText = event.target.nextElementSibling.lastElementChild.innerText;
}