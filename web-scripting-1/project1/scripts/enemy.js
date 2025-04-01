import { randomNumberInRange } from "./functions.js";

export function Enemy() {

    this.directionOdd = randomNumberInRange(0, 1);
    this.directionEven = randomNumberInRange(0, 1);

    this.y;
    this.x;
    
    this.type = randomNumberInRange(0, 5) > 4 ? 0 : 1;
    this.size = this.type ? 8 : 13;
    this.color = this.type ? 'green' : 'red';
    this.lastX = undefined;
    this.speed = 5;

    this.draw = function(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.size, this.size);
    }

    this.resetOdd = function() {
        if (this.directionOdd) {
            this.x = -(randomNumberInRange(0, 500));
        } else {
            this.x = randomNumberInRange(500, 1000);
        }
        this.y = randomNumberInRange(0, 500);
    }
    this.resetEven = function() {
        if (this.directionEven) {
            this.y = -(randomNumberInRange(0, 500));
        } else {
            this.y = randomNumberInRange(500, 1000);
        }
        this.x = randomNumberInRange(0, 500);
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