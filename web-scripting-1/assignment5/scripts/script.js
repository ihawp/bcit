/*

    Warren Chemerika
    BCIT | Web Scripting 1
    Assignment 5

    --------------

    More functional programming!

*/

const images = document.querySelectorAll('.cat-image-container');
const imagesContainer = document.querySelector('.cat-images-container');
const nameCreator = document.querySelector('.cat-name-creator');
const gameboardContainer = document.querySelector('.gameboard-container');
const form = document.querySelector('form');
images.forEach((item) => {
    item.addEventListener('click', doThing);
});

function doThing(event) {
    console.log(event.target.src); // get this value to event listener
    imagesContainer.style.display = 'none';
    nameCreator.style.display = 'block';
    // use src to reprint image into the "cat-name-creator"
}

function dealWithForm(event) {
    nameCreator.style.display = 'none';
    gameboardContainer.style.display = 'block';
    console.log(event.target[0].value);
}

form.addEventListener('submit', dealWithForm);
