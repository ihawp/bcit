/*

    Warren Chemerika
    BCIT | Web Scripting 1
    Assignment 5

    --------------

    More functional programming!

*/

function Car() {
    this.wow = 10;
    this.cool = 11;
}
let p = Car();
console.log(p.wow, p.cool);


const Player = {
    init: function() {
        console.log('wow');
        this.username = 'ihawp';
        this.bananaphone = 10;
    }
}
let wow = Object.create(Player);
console.log(wow.username, wow.bananaphone);
let l = Player;
l.init();
console.log(l.username, l.bananaphone);


const images = document.querySelectorAll('.cat-image-container');
const imagesContainer = document.querySelector('.cat-images-container');
const nameCreator = document.querySelector('.cat-name-creator');
const gameboardContainer = document.querySelector('.gameboard-container');
const catImageOutput = document.querySelector('.cat-image-output');
const catNameOutput = document.querySelector('.cat-name-output');
const form = document.querySelector('form');
let arr = {
    'food': document.getElementById('hunger-out'),
    'water': document.getElementById('thirst-out'),
    'pet': document.getElementById('love-out')
}
const btnFoodPlus = document.getElementById('btn-food-plus');
const btnFoodMinus = document.getElementById('btn-food-minus');
const btnWaterPlus = document.getElementById('btn-water-plus');
const btnWaterMinus = document.getElementById('btn-water-minus');
const btnPetPlus = document.getElementById('btn-pet-plus');
const btnPetMinus = document.getElementById('btn-pet-minus');

btnFoodPlus.addEventListener('click', addOne);
btnWaterPlus.addEventListener('click', addOne);
btnPetPlus.addEventListener('click', addOne);
btnFoodMinus.addEventListener('click', removeOne);
btnWaterMinus.addEventListener('click', removeOne);
btnPetMinus.addEventListener('click', removeOne);
form.addEventListener('submit', dealWithForm);
images.forEach((item) => {
    item.addEventListener('click', pickedCat);
});

function pickedCat(event) {
    // Set the output image before we ever go display nameCreator screen
    catImageOutput.src = event.target.src;
    imagesContainer.style.display = 'none';
    nameCreator.style.display = 'block';
}

function dealWithForm(event) {
    nameCreator.style.display = 'none';
    gameboardContainer.style.display = 'block';
    catNameOutput.firstElementChild.innerText = event.target[0].value;
}

function removeOne(event) {
    let stripped = event.target.id.split('-');
    let number = parseInt(arr[stripped[1]].innerText);
    if (number !== 0) {
        arr[stripped[1]].innerText = number - 1;
    }
}

function addOne(event) {
    let stripped = event.target.id.split('-');
    let number = parseInt(arr[stripped[1]].innerText);
    if (number !== 10) {
        arr[stripped[1]].innerText = number + 1;
    }
}

const messageHunger = document.getElementById('message-out-hunger');
const messageThirst = document.getElementById('message-out-thirst');
const messageLove = document.getElementById('message-out-love');

function changeMessage() {

}
