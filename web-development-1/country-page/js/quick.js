/*
    MIGHT REMOVE THIS AND REFIGURE LOGIC FOR IMAGE LOADING ONCE PAGES FILLED
*/
document.getElementById("hero-image").src = `media/bg${window.innerWidth < 640 ? '-mobile' : ''}.webp`;
