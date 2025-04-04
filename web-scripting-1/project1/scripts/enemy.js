import { randomNumberInRange } from "./functions.js";
import { context } from "./main.js";

import { Gunner } from './gunner.js';
import { Boopa } from './boopa.js';

export default function Enemy() {

    this.directionOdd = randomNumberInRange(0, 1);
    this.directionEven = randomNumberInRange(0, 1);

    this.y;
    this.x;
    
    this.type = randomNumberInRange(0, 7) > 5 ? 0 : 1;
    this.size = this.type ? 8 : 13;
    this.color = this.type ? '#16a34a' : '#F10040';
    this.lastX = undefined;
    this.speed = 5;

    this.draw = function(context) {
        context.save();
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.size, this.size);
        context.restore();
    }

    this.resetOdd = function() {
        if (this.directionOdd) {
            this.x = -(randomNumberInRange(100, 600));
        } else {
            this.x = randomNumberInRange(600, 1100);
        }
        this.y = randomNumberInRange(0, 500);
    }

    this.resetEven = function() {
        if (this.directionEven) {
            this.y = -(randomNumberInRange(100, 600));
        } else {
            this.y = randomNumberInRange(600, 1100);
        }
        this.x = randomNumberInRange(0, 500);
    }

    // Shoot shots
    // Only for gunner enemy.
    this.shot = {
        happening: false,
        x: undefined,
        y: undefined,
        speed: 8,
        size: 8,
    }
    this.adjustShot = function() {
        this.shot.x = this.x;
        this.shot.y = this.y;
    }
    this.drawShot = function() {
        // "Shoots boopas rather then bullets"
        context.fillStyle = '#16a34a';
        context.fillRect(this.shot.x, this.shot.y, this.shot.size, this.shot.size);
    }

    this.setSpeed = function(speed) {
        this.speed = speed;
    }

    this.setShotSpeed = function(speed) {
        this.shot.speed = speed;
    }

    this.setShotSize = function(size) {
        this.shot.size = size;
    }

    this.setSize = function(size) {
        this.size = size;
    }

}