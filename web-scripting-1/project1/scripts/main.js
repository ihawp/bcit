// ihawp.com Canvas API Game

import { backgroundColor } from "./functions.js";
import { Game } from './game.js';

/*


    CURRENT THINGS:

    1. Player offscreen to opposite side not properly implemented
    2. Enemies are printed above the player causing thing 'clearing' purple 
       background to be visible atop the Player.
    3. Enemies object needs more methods for moving to allow for multiple direction
       enemies, so that they can go to left or right or down or up.


*/

const canvas = document.getElementById('canvas');
let context = canvas.getContext("2d");
let game = new Game();

game.init(context);

let i = 0;

let gameInterval = {
    id: undefined,
}

gameInterval.id = start();
function draw() {
    // Enemies: update position / check position
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, 500, 500);
    game.draw(context);

    // to be updated later.
    i++;
    if (i === 1000) {
        clearInterval(id);
    }
}
let paused = true;
canvas.addEventListener('click', pauseController);

function start() {
    return setInterval(draw, 33.03030);
}
function pause() {
    console.log(clearInterval(gameInterval.id));
    return clearInterval(gameInterval.id);
}
function pauseController() {
    if (gameInterval.id === undefined) {
        return gameInterval.id = start();
    }
    return gameInterval.id = pause();
}