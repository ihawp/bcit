// this the place for powerups and !!

import { randomNumberInRange } from "./functions.js";
import { context } from './main.js';

export function Powerup() {

    this.direction = randomNumberInRange(0, 1);

    this.type = undefined;

    this.x = undefined;
    this.y = undefined;

    this.size = 25;
    this.speed = 7;

    this.lastTime = undefined;

    this.draw = function(context) {
        context.fillStyle = '#FFF700';
        context.fillRect(this.x, this.y, this.size, this.size);
    }

    this.resetLastTime = function() {
        this.lastTime = new Date().getUTCSeconds();
    }

    this.resetLastTime();

    this.resetType = function() {
        this.type = randomNumberInRange(0, 3);
    }

    this.resetX = function() {
        this.x = randomNumberInRange(0, 500);
    }

    this.resetY = function() {
        this.y = this.direction ? -500 : 1000;
    }

    this.reset = function() {
        this.resetType();
        this.resetX();
        this.resetY();
    }

    // set initial: x, y, type
    this.reset();

}

export function PowerUp() {

    // RETHINK
    // Need better system for managing powerups and which type and when and whatnot.

    this.newType = function() {
        this.type = randomNumberInRange(1, 4);
    }

    this.type = undefined;
    this.newType();
    
    this.direction = randomNumberInRange(0, 1);
    this.x = undefined;
    this.y = undefined;
    this.speed = 7;
    this.size = 25;
    this.happening = false;
    this.waiting = false;
    this.timeoutId = undefined;

    this.reset = function() {
        this.x = randomNumberInRange(0, 500);
        this.y = this.direction ? -500 : 1000;
        this.newType();
    }

    this.draw = function() {
        context.save();
        // Lemon Yellow
        context.fillStyle = '#FFF700';
        context.fillRect(this.x, this.y, this.size, this.size);
        context.restore();
        /*
        context.beginPath();
        context.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        context.fill();
        */
    }

    /*
    this.drawIndicator = function(context) {
        context.fillStyle = 'yellow';
        this.direction ? context.fillRect(this.x, 0, this.size, this.size) : context.fillRect(this.x, 500 - this.size, this.size, this.size);
    }
    */

    this.notHappening = function() {
        this.happening = true;
        this.reset();
        this.timeoutId = setTimeout(() => this.clearTimeout(this.timeoutId), 25000); 
    }

    this.resetTimeout = function() {
        this.happening = false;
        this.waiting = false;
    }

    this.clearTimeout = function(id) {
        this.resetTimeout();
        clearTimeout(id);
    }

}