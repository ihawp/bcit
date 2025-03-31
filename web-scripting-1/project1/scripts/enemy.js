import { randomNumberInRange } from "./functions.js";

export function Enemy() {

    this.directionOdd = randomNumberInRange(0, 1);
    this.directionEven = randomNumberInRange(0, 1);

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
    this.speed = 5;

    this.draw = function(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.size, this.size);
    }

    this.moveRight = function() {
        this.x += this.speed;
    }
    this.moveLeft = function() {
        this.x -= this.speed;
    }
    this.moveDown = function() {
        this.y -= this.speed;
    }
    this.moveUp = function() {
        this.y += this.speed;
    }

}