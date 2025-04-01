import { randomNumberInRange } from "./functions.js";
import { context } from "./main.js";

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
        current: false,
        x: undefined,
        y: undefined,
        speed: 8,
        size: 8,
    }
    this.adjustShot = function() {
        this.shot.x = this.x;
        this.shot.y = this.y;
    }
    this.shootLeft = function() {
        this.shot.x -= this.shot.speed;
    }
    this.shootRight = function() {
        this.shot.x += this.shot.speed;
    }
    this.shootDown = function() {
        this.shot.y += this.shot.speed;
    }
    this.shootUp = function() {
        this.shot.y -= this.shot.speed;
    }
    this.drawShot = function() {
        // "Shoots boopas rather then bullets"
        context.fillStyle = 'green';
        context.fillRect(this.shot.x, this.shot.y, this.shot.size, this.shot.size);
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