/*
    Two Implementations

    1. DOM: Uses <div> and <span> elements.

    2. Canvas: Particles are drawn to <canvas>. 
    
    All particle instances are stored in array in ( instanceName.particles ).

*/

import { randomNumberInRange } from './functions.js';

// DOM Version
export default function Panel() {
    this.panel = document.createElement('div');
    this.panel.id = ('panel');
    this.style = this.panel.style;
    this.style.position = 'absolute';
    this.style.top = '0';
    this.style.left = '0';
    this.style.width = '100vw';
    this.style.height = '100vw';
    this.style.zIndex = '-1';

    this.particles = [];

    this.init = function() {
        document.body.insertAdjacentElement('afterbegin', this.panel);

        for (let i = 0; i < 500; i++) {

            let particle = document.createElement('span');
            let style = particle.style;

            style.background = 'white';
            style.borderRadius = '100px';
            style.position = 'absolute';

            style.width = '1px';
            style.height = '1px';

            style.top = `${randomNumberInRange(0, window.innerHeight)}px`;
            style.left = `${randomNumberInRange(0, window.innerWidth)}px`;

            this.panel.insertAdjacentElement('beforeend', particle);
            this.particles.push(particle);

        }
    }
}

// Move in circle around radius from center of screen?
// Update position on each draw.

// Canvas Version
export function ParticleBackground() {

    this.canvas = document.createElement('canvas');
    this.particles = [];
    this.context = this.canvas.getContext('2d');
    this.canvas.id = 'particle-background';
    this.style = this.canvas.style;
    this.style.position = 'absolute';
    this.style.top = '0';
    this.style.left = '0';
    this.canvas.setAttribute('width', `${window.innerWidth}`);
    this.canvas.setAttribute('height', `${window.innerHeight}`);
    this.style.zIndex = '-1';

    this.init = function() {
        document.body.insertAdjacentElement('afterbegin', this.canvas);

        this.context.fillStyle = '#fff';
        for (let i = 0; i < 500; i++) {

            let particle = new Particle();

            this.context.fillRect(particle.x, particle.y, 1, 1);

            this.particles.push(particle);

        }
    }
}

function Particle() {
    this.x = randomNumberInRange(0, window.innerWidth);
    this.y = randomNumberInRange(0, window.innerHeight);
}