// ihawp.com Canvas API Game

import { Game } from './game.js';
import Panel from './particle.js';

export const canvas = document.getElementById('canvas');
export const context = canvas.getContext("2d");
export const framerate = 33.03030;

const panel = new Panel();
panel.init();

const game = new Game();
game.init();