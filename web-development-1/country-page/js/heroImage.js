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
    const heroImageContainer = document.getElementById('hero-image-container');
    let image = new Image(0, 1);
    image.classList.add('h-2');
    image.classList.add('w-auto');
    image.classList.add('object-cover');
    image.alt = 'Fake Travel Canada Hero Image'
    image.title = 'Fake Travel Canada Hero Image'
    image.src = l.href;
    image.draggable = false;

    heroImageContainer.appendChild(image);
});
