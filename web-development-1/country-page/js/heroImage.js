/*

    heroImage.js
    Warren Chemerika

    Insert a preload for an image

    Insert the image as an src of the #hero-image
    of the page

*/
let l = document.createElement("link");

l.rel = 'preload';

l.as = 'image';

l.href = `media/hero/hero-${Math.round(Math.random() * (2 - 0.75) + 0.75)}${window.innerWidth < 640 ? '-mobile' : ''}.webp`;

document.head.appendChild(l);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('hero-image').src = l.href
});