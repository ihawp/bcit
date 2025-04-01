// this the place for powerups and !!

import { randomNumberInRange } from "./functions.js";
import { context } from './main.js';


export function PowerUp() {
    console.log('this is powerup');

    this.type = randomNumberInRange(1, 4);
    this.x = undefined;
    this.y = undefined;
    this.speed = 7;
    this.size = 20;
    this.happening = false;

    this.type = randomNumberInRange(1, 4);

    this.reset = function() {
        this.x = randomNumberInRange(1, 500);
        this.y = this.type ? -(randomNumberInRange(0, 500)) : randomNumberInRange(500, 1000);
    }

    this.draw = function() {
        context.fillStyle = 'yellow';
        context.fillRect(this.x, this.y, this.size, this.size);
    }

    this.moveDown = function() {
        this.y += this.speed;
    }
    this.moveUp = function() {
        this.y -= this.speed;
    }
    this.moveRight = function() {
        this.x += this.speed;
    }
    this.moveLeft = function() {
        this.x -= this.speed;
    }
}