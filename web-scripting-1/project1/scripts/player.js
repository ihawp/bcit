import { backgroundColor } from "./functions.js";

export function Player(x, y) {
    this.x = x;
    this.y = y;
    this.lastX;
    this.lastY;
    this.size = 25;
    this.speed = 5;
    this.velocityX = 0;
    this.velocityY = 0;
    this.draw = function(context) {

        this.x += this.velocityX;
        this.y += this.velocityY;

        // Block the user in.
        // Removable if using 5 player method.
        /*
        if (this.y < 0) this.y = 0;
        if (this.y > 475) this.y = 475;
        if (this.x < 0) this.x = 0;
        if (this.x > 475) this.x = 475;
        */
        context.fillStyle = 'black';
        context.fillRect(this.x, this.y, this.size, this.size);

    }
    this.remove = function(context) {
        if (this.lastX !== undefined && this.lastY !== undefined) {
            context.fillStyle = backgroundColor;
            context.fillRect(this.lastX, this.lastY, this.size, this.size);
        }
    }
    this.keyDown = event => {
        event.preventDefault();
        let q = event.key;
        switch (q) {
            case ('w'):
                this.lastY = this.y;
                this.velocityY = -(this.speed);
                break;
            case ('a'):
                this.lastX = this.x;
                this.velocityX = -(this.speed);
                break;
            case ('s'):
                this.lastY = this.y;
                this.velocityY = this.speed;
                break;
            case ('d'):
                this.lastX = this.x;
                this.velocityX = this.speed;
                break;
        }
    }
    this.keyUp = event => {
        event.preventDefault();
        let q = event.key;
        switch (q) {
            case ('w'):
                this.velocityY = 0;
                break;
            case ('s'):
                this.velocityY = 0;
                break;
            case ('a'):
                this.velocityX = 0;
                break;
            case ('d'):
                this.velocityX = 0;
                break;
        }
    }
    document.addEventListener('keydown', this.keyDown);
    document.addEventListener('keyup', this.keyUp);
}