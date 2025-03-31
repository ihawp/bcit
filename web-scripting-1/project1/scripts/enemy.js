import { randomNumberInRange, backgroundColor } from "./functions.js";

export function Enemy() {

    this.directionOdd = randomNumberInRange(0, 1);
    this.directionEven = randomNumberInRange(0, 1);

    // How to best calculate or define the this.y/this.x based on directionOdd/Even and this.round (in Game)?
    /*



    */
    
    // All for ODD
    this.y = randomNumberInRange(1, 500);
    this.x = -(randomNumberInRange(1, 500));
    this.xAlt = randomNumberInRange(500, 1000);

    // All for EVEN
    this.yEven = -(randomNumberInRange(1, 500));
    this.xEven = randomNumberInRange(1, 500);
    this.yAlt = randomNumberInRange(500, 1000);
    
    this.type = randomNumberInRange(0, 5) > 4 ? 0 : 1;
    this.size = this.type ? 8 : 13;
    this.color = this.type ? 'green' : 'red';
    this.lastX = undefined;

    this.draw = function(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.size, this.size);
    }
    this.remove = function(context) {
        context.fillStyle = backgroundColor;
        context.fillRect(this.x, this.y, this.size, this.size);
    }
    this.moveRight = function() {
        this.x += 5;
    }
    this.moveLeft = function() {
        this.x -= 5;
    }
    this.moveDown = function() {
        this.y -= 5;
    }
    this.moveUp = function() {
        this.y += 5;
    }
}

function Gunner() {
    this.gunner = 'gunner';
}

function Boopa() {
    this.boopa = 'boopa';
}