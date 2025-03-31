import { randomNumberInRange, backgroundColor } from "./functions.js";

export function Enemy() {

    this.directionOdd = randomNumberInRange(0, 1);
    this.directionEven = randomNumberInRange(0, 1);
    
    this.y = randomNumberInRange(1, 500);
    this.x = -(randomNumberInRange(1, 500));
    
    this.type = randomNumberInRange(0, 5) > 4 ? 0 : 1;
    this.size = this.type ? 8 : 13;
    this.color = this.type ? 'green' : 'red';
    this.lastX = undefined;

    this.draw = function(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.size, this.size);
    }
    this.remove = function(context) {
        if (this.lastX !== undefined) {
            context.fillStyle = backgroundColor;
            context.fillRect(this.lastX, this.y, this.size, this.size);
        }
    }
    this.update = function() {
        this.lastX = this.x;
        this.x += 5;
    }
    this.moveRight = function() {
        this.lastX = this.x;
        this.x += 5;
    }
    this.moveLeft = function() {
        this.lastX = this.x;
        this.x -= 5;
    }
    this.moveDown = function() {
        this.lastX = this.x;
        this.x -= 5;
    }
    this.moveUp = function() {
        console.log('i am moving up ', x);
        this.lastX = this.x;
        this.x += 5;
        console.log('am i moving up? ', x);
    }
}

function Gunner() {
    this.gunner = 'gunner';
}

function Boopa() {
    this.boopa = 'boopa';
}