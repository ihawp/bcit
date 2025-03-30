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
        
        // Create Enemies
        for (let i = 0; i < 20; i++) this.enemies.push(new Enemy());

        // Create Players
        // Could have array of starting positions here.
        let sX = [-250, 750, 250, 250, 250];
        let sY = [250, 250, 750, -250, 250];
        for (let i = 0; i < 5; i++) this.players.push(new Player(sX[i], sY[i]));
        // If going to do 5 player thing for going off edges
        // have counting for offscreen enemies (don't render anything).
        // Once the enemy would be expected to be on screen begin rendering
        // and clearing, etc.

        // Create PowerUps
        
    }
    this.draw = function(context) {
        
        // context.save();

        // Players
        for (let i = 0; i < this.players.length; i++) {
            let p = this.players[i];
            p.remove(context);
            p.draw(context);
        }

        // Enemies
        for (let i = 0; i < this.enemies.length; i++) {

            let enemy = this.enemies[i];

            // Check if enemy is out of distance.
            if (enemy.x > 500) {
                enemy.x = -(randomNumberInRange(1, 500));
            }

            this.moveEnemy(enemy, context);

            // check intersection
            // use radius idea.

            // check radius of player 25px
            
            // create square in code of enemy / player
            if (this.players) {

            }

        }

        // Powerups (if any active)


        // context.restore();

    }
    this.moveEnemy = (enemy, context) => {
        enemy.remove(context);
        enemy.update();
        enemy.draw(context);
    }
}

function Player(x, y) {
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