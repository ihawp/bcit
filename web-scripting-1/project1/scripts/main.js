// ihawp.com Canvas API Game

import Game from './game.js';
import { ParticleBackground } from './particle.js';

export const canvas = document.getElementById('canvas');
export const context = canvas.getContext("2d");

// 30 fps: 33.3333333333 (intended fps)
// 60 fps: 16.6666666667 (speeds game up)
export const framerate = 33.3333333333;

window.addEventListener('load', () => {
    

    // Game Instance / Run Game
    new Game().init();


    // Particle Background Instance (Canvas)
    new ParticleBackground().init();

});