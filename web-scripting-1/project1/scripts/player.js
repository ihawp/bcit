export function Player(x, y) {

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
        // Build in-out-around.
        context.fillStyle = 'black';
        if (this.y < 25) {
            context.fillRect(this.x, this.y + 500, this.size, this.size);
        }

        if (this.y < 0) {
            this.y = 500;
        }

        if (this.y > 475) {
            context.fillRect(this.x, this.y - 500, this.size, this.size);
        }

        if (this.y > 500) {
            this.y = 0;
        }

        if (this.x < 25) {
            context.fillRect(this.x + 500, this.y, this.size, this.size);
        }

        if (this.x < 0) {
            this.x = 500;
        }

        if (this.x > 475) {
            context.fillRect(this.x - 500, this.y, this.size, this.size);
        }

        if (this.x > 500) {
            this.x = 0;
        }

        // Draw Player
        context.fillStyle = 'black';
        context.fillRect(this.x, this.y, this.size, this.size);
        
    }

    this.invincibility = function(boolean) {
        this.invincible = boolean;
    }

    this.keyDown = event => {
        event.preventDefault();
        switch (event.keyCode) {
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
        event.preventDefault();
        switch (event.keyCode) {
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
        this.x = 250;
        this.y = 250;
    }

    document.addEventListener('keydown', this.keyDown);
    document.addEventListener('keyup', this.keyUp);

}