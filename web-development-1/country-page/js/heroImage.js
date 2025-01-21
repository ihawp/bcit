

const q = Math.round(Math.random() * (2 - 0.75) + 0.75);

const l = document.createElement("link");

l.rel = 'preload';

l.as = 'image';

l.href = `media/hero/hero-${q}${window.innerWidth < 640 ? '-mobile' : ''}.webp`;

document.head.appendChild(l);

document.addEventListener('DOMContentLoaded', () =>
    document.getElementById('hero-image').src = l.href
);