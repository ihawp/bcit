// use canvas api

/*
Probably the biggest limitation is, that once a shape gets drawn, it stays that way. 
If we need to move it we have to redraw it and everything that was drawn before it. 
It takes a lot of time to redraw complex frames and the performance depends highly 
on the speed of the computer it's running on.
*/

/*
    Steps to draw one (1) frame:

        1. Clear the canvas (clearRect())

        2. Save the canvas state

        3. draw animated shapes

        4. restore the canvas state

*/

const canvas = document.getElementById('canvas');
let context = canvas.getContext("2d");
let backgroundColor = 'purple';

function Game() {
    this.thing = 10;
    this.enemies = [];
    this.players = [];
    this.powerups = undefined;
    this.init = function(context) {
        

        this.players.push(new Player());

        for (let i = 0; i < 20; i++) {
            let q = new Enemy();
            this.enemies.push(q);
            q.draw(context);
        }

        // Create player
        // If going to do 5 player thing for going off edges
        // have counting for offscreen enemies (don't render anything).
        // Once the enemy would be expected to be on screen begin rendering
        // and clearing, etc.
    }
    this.draw = function(context) {
        
        context.save();

        for (let i = 0; i < this.players.length; i++) {
            let p = this.players[i];

            p.remove(context);
            p.draw(context);
        }

        // Enemies
        for (let i = 0; i < this.enemies.length; i++) {

            // Update position
            let p = this.enemies[i];

            if (p.x > 500) {
                p.x = -(randomNumberInRange(1, 500));
            }

            // check intersection
            // use radius idea.

            p.remove(context);
            p.update();
            p.draw(context);
    
            // Check position
    
        }

        // Player


        // Powerups (if any active)


        context.restore();

    }
}

function Player() {
    this.x = 237;
    this.y = 237;
    this.lastX;
    this.lastY;
    this.size = 25;
    this.speed = 5;
    this.velocityX = 0;
    this.velocityY = 0;
    this.draw = function(context) {
        context.fillStyle = 'black';
        this.x += this.velocityX;
        this.y += this.velocityY;
        if (this.velocityX > 0) {
            this.x += this.velocityX;
        }
        context.fillRect(this.x, this.y, this.size, this.size);
    }
    this.remove = function(context) {
        if (this.lastX !== undefined && this.lastY !== undefined) {
            context.fillStyle = backgroundColor;
            context.fillRect(this.lastX, this.lastY, this.size, this.size);
        }
    }
    this.keyDown = function(event) {
        event.preventDefault();
        let q = event.key;
    
        // MOVEMENT IS NOT SMOOTH AT ALL.
        // Need to have a value added constantly while keydown
        // If keyup stop adding that value to x/y
        // This is what the p5.js framework did for me last year.
    
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
    this.keyUp = function(event) {
        event.preventDefault();
        let q = event.key;
        switch (q) {
            case ('w'):
            case ('a'):
            case ('s'):
            case ('d'):
                this.velocityX = 0;
                break;
        }
    }
    document.addEventListener('keydown', this.keyDown);
    document.addEventListener('keyup', this.keyUp);
}

function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function Enemy() {
    this.y = randomNumberInRange(1, 500);
    this.x = -(randomNumberInRange(1, 500));

    // Review.
    this.type = randomNumberInRange(0, 1);
    this.size = this.type ? 8 : 13;
    this.color = this.type ? 'green' : 'red';

    this.lastX = undefined;
    this.draw = function(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.size, this.size);
    };
    this.remove = function(context) {
        if (this.lastX !== undefined) {
            context.fillStyle = backgroundColor;
            context.fillRect(this.lastX, this.y, this.size, this.size);
        }
    };
    this.update = function() {
        this.lastX = this.x;
        this.x += 5;
    };
}

function Gunner() {
    this.gunner = 'gunner';
}

function Boopa() {
    this.boopa = 'boopa';
}

let game = new Game();
game.init(context);
let id = setInterval(draw, 30.3);
function draw() {

    // Enemies: update position / check position
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, 500, 500);
    game.draw(context);
}