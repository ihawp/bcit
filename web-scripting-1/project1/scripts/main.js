// ihawp.com Canvas API Game

import { Game } from './game.js';
import Panel from './particle.js';
import { ParticleBackground } from './particle.js';

export const canvas = document.getElementById('canvas');
export const context = canvas.getContext("2d");

// 30 fps: 33.3333333333 (intended fps)
// 60 fps: 16.6666666667 (speeds game up)
export const framerate = 33.3333333333;

// Particle Background Instance (DOM)
// new Panel().init();

// Game Instance / Run Game
window.addEventListener('load', function() {
    
    // Particle Background Instance (Canvas)
    let particleBackground = new ParticleBackground();
    particleBackground.init();

    // Game Instance / Run Game
    const game = new Game();
    game.init();

});