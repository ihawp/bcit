export default function Player(x, y) {

    this.x = x;
    this.y = y;
    this.size = 25;
    this.speed = 5;
    this.velocityX = 0;
    this.velocityY = 0;

    this.top = undefined;
    this.bottom = undefined;
    this.left = undefined;
    this.right = undefined;

    this.overedge = false;
    this.distorted = undefined;

    this.invincible = false;

    this.draw = function(context) {

        // Update player position (if velocity)
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Block the user in.
        /*
        if (this.y < 0) this.y = 0;
        if (this.y > 475) this.y = 475;
        if (this.x < 0) this.x = 0;
        if (this.x > 475) this.x = 475;
        */
        // Over Edge

        context.save();

        context.fillStyle = 'black';

        if (this.y < 25) {
            context.fillRect(this.x, this.y + 500, this.size, this.size);
            this.distorted = 1;
        }

        if (this.y + this.size < 0) {
            this.y = 475;
        }

        if (this.y > 475) {
            context.fillRect(this.x, this.y - 500, this.size, this.size);
            this.distorted = 2;
        }

        if (this.y > 500) {
            this.y = 0;
        }

        if (this.x < 25) {
            context.fillRect(this.x + 500, this.y, this.size, this.size);
            this.distorted = 3;
        }

        if (this.x < 0) {
            this.x = 500;
        }

        if (this.x > 475) {
            context.fillRect(this.x - 500, this.y, this.size, this.size);
            this.distorted = 4;
        }

        if (this.x > 500) {
            this.x = 0;
        }

        // Set overedge value
        if (this.y < 25 || this.y > 475 || this.x < 25 || this.x > 475) {
            this.overedge = true;
        }

        if (this.y > 25 && this.y < 475 && this.x > 25 && this.x < 475) {
            this.overedge = false;
        }

        // Draw Player
        context.fillRect(this.x, this.y, this.size, this.size);

        context.restore();
        
    }

    this.invincibility = (boolean) => {
        this.invincible = boolean;
    }

    this.setSpeed = (speed) => {
        this.speed = speed;
    }

    this.keyDown = event => {
        let code = event.keyCode;
        if (code === 87 || code === 65 || code === 83 || code === 68) {
            event.preventDefault();
        }
        switch (code) {
            case (87):
                this.velocityY = -(this.speed);
                break;
            case (65):
                this.velocityX = -(this.speed);
                break;
            case (83):
                this.velocityY = this.speed;
                break;
            case (68):
                this.velocityX = this.speed;
                break;
        }
    }

    this.keyUp = event => {
        let code = event.keyCode;
        if (code === 87 || code === 65 || code === 83 || code === 68) {
            event.preventDefault();
        }
        switch (code) {
            case (87):
                this.velocityY = 0;
                break;
            case (83):
                this.velocityY = 0;
                break;
            case (65):
                this.velocityX = 0;
                break;
            case (68):
                this.velocityX = 0;
                break;
        }
    }

    this.reset = function() {
        this.x = 237.5;
        this.y = 237.5;
    }

    document.addEventListener('keydown', this.keyDown);
    document.addEventListener('keyup', this.keyUp);

}