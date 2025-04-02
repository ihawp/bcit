import { randomNumberInRange } from "./functions.js";
import { Enemy } from './enemy.js';
import { Player } from './player.js';
import { PowerUp } from './powerup.js';
import { canvas, context, framerate } from './main.js';
const lives = document.getElementById('lives');
const round = document.getElementById('round');
const enemiesDefeated = document.getElementById('enemies-defeated');
const backgroundColor = 'purple';

export function Game() {

    this.player;
    this.enemies = [];
    this.powerups = [];
    this.plays = 0;
    this.round = 1;
    this.lives = 3;
    this.totalEnemiesDefeated = 0;
    this.intervalId = undefined;

    this.init = function() {
        
        for (let i = 0; i < 20; i++) {
            let enemy = new Enemy();
            this.resetEnemy(enemy);
            this.enemies.push(enemy);
        }
        
        this.player = new Player(250, 250);

        // Create PowerUps
        this.powerup = new PowerUp();

        this.setLives();

        // Could be swapped to animation start or something prior to game beginning.
        if (this.plays === 0) {
            this.intervalId = this.home();
            canvas.addEventListener('click', this.pauseController);
        } else {
            this.startGame();
        }
    }

    // ------------------------------------------------------------------
    // UPDATE GAME FRAME:

    this.draw = function() {

        // context.save();

        // Background
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, 500, 500);

        let round = this.round % 2 == 0;

        // Check Round Completion
        if (this.totalEnemiesDefeated >= this.round * 100) {
            this.pause();
            return this.nextRound();
        }

        // Players
        this.player.draw(context);

        // Player square.
        // Perhaps revert to making 4 new var here
        // that are passed to each of the ..checkIntersection.. functions.
        // State of this.player.left..etc might be new when called later by the intersection function.
        this.player.left = this.player.x;
        this.player.right = this.player.x + this.player.size;
        this.player.top = this.player.y;
        this.player.bottom = this.player.y + this.player.size;

        // Enemies
        this.enemies.forEach(enemy => {

            // Check intersection of enemy and player
            if (this.checkIntersection(enemy)) {
                if (!this.player.invincible) {
                    this.enemyIntersection();
                }
            }

            // Check if enemy is out of distance.
            if (round) {
                if (enemy.y > 500 && enemy.directionEven || enemy.y < 0 && !enemy.directionEven) {
                    enemy.resetEven();
                    enemiesDefeated.innerText = this.totalEnemiesDefeated += 1;
                }
            } else {
                if (enemy.x > 500 && enemy.directionOdd || enemy.x < 0 && !enemy.directionOdd) {
                    enemy.resetOdd();
                    enemiesDefeated.innerText = this.totalEnemiesDefeated += 1;
                }
            }

            // Update Enemy Position
            if (round) {
                enemy.directionEven ? enemy.moveDown() : enemy.moveUp();
            } else {
                enemy.directionOdd ? enemy.moveRight() : enemy.moveLeft();
            }

            // Draw the enemy in new position.
            enemy.draw(context);

            // Shoot shots
            if (enemy.type === 0) {

                if (!enemy.shot.happening) {
                    enemy.adjustShot();
                    enemy.shot.happening = randomNumberInRange(1, 4);
                }

                // Check intersection of shot and player
                if (this.checkIntersection(enemy.shot)) {
                    if (!this.player.invincible) {
                        setTimeout(() => enemy.shot.happening = false, 2000);
                        enemy.adjustShot();
                        this.shotIntersection();
                    }
                }

                if (enemy.shot.happening) {
                    switch (enemy.shot.happening) {
                        case (1):
                            enemy.shootDown();
                            break;
                        case (2):
                            enemy.shootLeft();
                            break;
                        case (3):
                            enemy.shootUp();
                            break;
                        case (4):
                            enemy.shootRight();
                            break;
                    }
                    enemy.drawShot();
                }

                // Check if enemy shot off-screen
                if (enemy.shot.x > 500 || enemy.shot.x < 0 || enemy.shot.y > 500 || enemy.shot.y < 0) {
                    enemy.shot.happening = false;
                }

            }

        });

        // Powerups
        if (this.checkIntersection(this.powerup)) {
            this.powerUpIntersection();
        }
        if (!this.powerup.happening) this.powerup.notHappening();
        if (!this.powerup.waiting) this.powerup.notWaiting();

        // context.restore();

    }
    
    // ------------------------------------------------------------------
    // RESET:

    this.resetEnemy = function(enemy) {
        if (this.round % 2 == 0) {
            enemy.resetEven();
        } else {
            enemy.resetOdd();
        }
        enemy.adjustShot();
    }

    this.resetEnemies = function() {
        this.enemies.forEach(enemy => this.resetEnemy(enemy));
    }

    this.resetBetween = function() {
        this.player.reset();
        this.resetEnemies();
        this.powerup.reset();
    }

    this.resetStats = function() {
        this.plays++;
        this.round = 1;
        this.totalEnemiesDefeated = 0;
        this.lives = 3;
        round.innerText = this.round;
        this.setLives();
        enemiesDefeated.innerText = this.totalEnemiesDefeated;
    }

    // ------------------------------------------------------------------
    // GENERAL CHECK INTERSECTION:

    this.intersection = function() {
        this.resetEnemies();
        
        this.pause();

        if (this.lives <= 0) {
            return this.dead();
        }

        this.setLives();

        this.respawn();
    }

    this.checkIntersection = function(checkable) {

        // Square representing where edges are of checkable item
        let left = checkable.x;
        let right = checkable.x + checkable.size;
        let top = checkable.y;
        let bottom = checkable.y + checkable.size;

        // Gather if checkable item is intersecting with player
        let ifTop = top > this.player.top && top < this.player.bottom;
        let ifBottom = bottom > this.player.top && bottom < this.player.bottom;
        let ifRight = right > this.player.left && right < this.player.right;
        let ifLeft = left < this.player.right && left > this.player.left;

        // Over Edge
        if (this.player.overedge) {

            // Create variables for possible use
            let ifThisBottom;
            let ifThisTop;
            let ifThisLeft;
            let ifThisRight;

            switch (this.player.distorted) {
                case (1):
                    // Off Top
                    ifThisBottom = bottom > this.player.top + 500 && bottom < this.player.bottom + 500;
                    ifThisTop = top > this.player.top + 500 && top < this.player.bottom + 500;
                    break;
                case (2):
                    // Off Bottom
                    ifThisBottom = bottom > this.player.top - 500 && bottom < this.player.bottom - 500;
                    ifThisTop = top > this.player.top - 500 && top < this.player.bottom - 500;
                    break;
                case (3):
                    // Off Left
                    ifThisLeft = left < this.player.right + 500 && left > this.player.left + 500;
                    ifThisRight = right < this.player.right + 500 && right > this.player.left + 500;
                    break;
                case (4):
                    // Off Right
                    ifThisLeft = left < this.player.right - 500 && left > this.player.left - 500;
                    ifThisRight = right > this.player.left - 500 && right < this.player.right - 500;
                    break;
            }

            // Test if checkable item is intersecting with MIRRORED player.
            if (ifThisTop && ifLeft || ifThisBottom && ifLeft || ifThisTop && ifRight || ifThisBottom && ifRight) {
                return 1;
            }
            
        }

        // Test if checkable item is intersecting with player
        // Could have mixed this with the checking of the mirrored player... but
        // for now I will leave the if statements seperated.
        if (ifTop && ifLeft || ifBottom && ifLeft || ifTop && ifRight || ifBottom && ifRight) {
            return 1;
        }

        // No intersection
        return 0;

    }

    // ------------------------------------------------------------------
    // SPECIFIC INTERSECTIONS:

    this.powerUpIntersection = function() {

        this.powerup.waiting = true;
        this.powerup.reset();

        // Run powerup
        switch (this.powerup.type) {
            case (1):
                // Slowdown
                // Perhaps add 3 powerups that are forgotten about later
                this.setEnemiesSpeed(1);
                setTimeout(() => this.setEnemiesSpeed(5), 5000);
                break;
            case (2):
                // Rainbow
                this.setEnemiesSpeed(10);
                this.setEnemiesSize(0);
                this.player.invincibility(true);
                setTimeout(() => {
                    this.setEnemiesSpeed(5);
                    this.resetEnemiesSize();
                }, 5000);
                setTimeout(() => {
                    this.player.invincibility(false);
                }, 7500);
                break;
            case (3):
                // Trick (this one is dumb)
                this.player.speed = 3;
                setTimeout(() => this.player.speed = 5, 5000);
                break;
            case (4):
                // Free Life
                this.lives++;
                this.setLives();
                break;
        }

    }

    this.enemyIntersection = function() {

        this.lives--;

        this.intersection();

    }

    this.shotIntersection = function() {

        this.lives--;

        this.intersection();

    }

    // ------------------------------------------------------------------
    // SET VALUE(s):

    this.setLives = function() {
        lives.innerHTML = '';
        for (let i = 0; i < this.lives; i++) {
            lives.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>';
        }
    }

    this.setEnemiesSpeed = function(speed) {
        this.enemies.forEach(enemy => {
            enemy.setSpeed(speed);
            enemy.setShotSpeed(speed * 1.6);
        });
    }

    this.setEnemiesSize = function(size) {
        this.enemies.forEach(enemy => {
            enemy.setSize(size)
            enemy.setShotSize(size);
        });
    }

    this.resetEnemiesSize = function() {
        this.enemies.forEach(enemy => {
            enemy.type ? enemy.setSize(8) : enemy.setSize(13)
            enemy.shot.size = 8;
        });
    }

    // ------------------------------------------------------------------
    // START/PAUSE:

    this.startGame = function() {
        return this.intervalId = setInterval(() => this.draw(), framerate);
    }

    this.pause = function() {
        return this.intervalId = clearInterval(this.intervalId);
    }

    this.pauseController = () => {
        if (this.intervalId) {
            return this.intervalId = this.pause();
        }
        this.intervalId = this.startGame();
    }

    // ------------------------------------------------------------------
    // SCREENS:
    
    this.home = function() {

        context.save();
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, 500, 500);
        context.save();
        context.font = '25px sans-serif';
        context.fillStyle = 'white';
        context.fillText('Welcome to Breakthrough v2', 90, 250);
        context.font = '15px sans-serif';
        context.fillText('Click anywhere to begin', 170, 290);
        context.restore();

    }

    this.welcome = function() {
        // animation showing how to play game or something?
    }

    this.dead = function() {
        this.resetBetween();
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, 500, 500);
        context.fillStyle = 'blue';
        context.font = '25px sans-serif';
        context.fillStyle = 'white';
        context.fillText('You died.', 210, 250);
        context.font = '15px sans-serif';
        context.fillText(`You defeated ${this.totalEnemiesDefeated} enemies.`, 170, 290);
        context.fillText(`You made it to round ${this.round}`, 180, 330);
        this.resetStats();
    }

    this.respawn = function() {
        this.resetBetween();
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, 500, 500);
        context.fillStyle = 'blue';
        context.fillStyle = 'white';
        context.font = '25px sans-serif';
        context.fillText('You died.', 210, 250);
        context.font = '15px sans-serif';
        context.fillText('Click anywhere to respawn.', 170, 290);
    }

    this.nextRound = function() {
        this.resetBetween();
        context.fillStyle = 'green';
        context.fillRect(0, 0, 500, 500);
        context.fillStyle = 'black';
        context.font = '25px sans-serif';
        context.fillText(`You completed round ${this.round}!`, 130, 250);
        context.font = '15px sans-serif';
        context.fillText('Click anywhere to continue...', 170, 290);
        this.round++;
        round.innerText = this.round;
        this.resetEnemies();
    }

}