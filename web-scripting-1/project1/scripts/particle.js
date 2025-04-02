// For particle background?

import { randomNumberInRange } from './functions.js';

export default function Panel() {
    this.panel = document.createElement('div');
    this.style = this.panel.style;
    this.style.position = 'absolute';
    this.style.top = '0';
    this.style.left = '0';
    this.style.width = '100vw';
    this.style.height = '100vh';
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