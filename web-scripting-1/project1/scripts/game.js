import { randomNumberInRange, convertIntToRoman } from "./functions.js";
import { Enemy } from './enemy.js';
import { Player } from './player.js';
import { PowerUp } from './powerup.js';
import { canvas, context, framerate } from './main.js';
const backgroundColor = 'purple';

export default function Game() {

    this.player;
    this.enemies = [];
    this.powerups = [];
    this.plays = 0;
    this.round = 1;
    this.lives = 3;
    this.totalEnemiesDefeated = 99;

    this.intervalId = undefined;
    this.welcomeId = undefined;

    this.target = 100;

    this.init = function() {
        
        for (let i = 0; i < 20; i++) {
            let enemy = new Enemy();
            this.resetEnemy(enemy);
            this.enemies.push(enemy);
        }
        this.player = new Player(237.5, 237.5);

        // Create PowerUps
        this.powerup = new PowerUp();

        // Could be swapped to animation start or something prior to game beginning.
        if (this.plays === 0) {
            this.intervalId = this.welcome();
            canvas.addEventListener('click', this.homeListener);
        } else {
            this.startGame();
        }
    }

    // ------------------------------------------------------------------
    // UPDATE GAME FRAME:

    this.draw = function() {

        // Check Round Completion
        if (this.totalEnemiesDefeated >= this.round * this.target) {
            this.pause();
            return this.nextRound();
        }

        // Background
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, 500, 500);

        // Print Lives
        let x = 450;
        for (let i = 0; i < this.lives; i++) {
            let y = (i * 43) + 5;
            context.fillStyle = 'rgb(255, 255, 255, 0.2)';
            context.beginPath();
            context.moveTo(x + 22.5, y + 20);
            context.bezierCurveTo(x + 22.5, y + 11.1, x + 21, y + 7.5, x + 15, y + 7.5);
            context.bezierCurveTo(x + 6, y + 7.5, x + 6, y + 18.75, x + 6, y + 18.75);
            context.bezierCurveTo(x + 6, y + 24, x + 12, y + 30.6, x + 22.5, y + 36);
            context.bezierCurveTo(x + 33, y + 30.6, x + 39, y + 24, x + 39, y + 18.75);
            context.bezierCurveTo(x + 39, y + 18.75, x + 39, y + 7.5, x + 30, y + 7.5);
            context.bezierCurveTo(x + 25.5, y + 7.5, x + 22.5, y + 11.1, x + 22.5, y + 12);
            context.fill();
        }

        // Print Round
        context.save();
        context.font = '25px Boldonse';
        context.fillText('Round: ' + convertIntToRoman(this.round), 12.5, 45);
        context.restore();

        let round = this.round % 2 == 0;
        
        // Print progress
        const barX = 325;
        const barY = 478;
        const barLength = 150;
        const thisRoundEnemies = this.totalEnemiesDefeated - ((this.round - 1) * this.target);
        const currentProgress = (thisRoundEnemies / this.target);
        const barPosition = barX + (currentProgress * barLength);
        context.save();
        context.fillRect(barX, barY, 150, 7);
        context.fillStyle = 'gray';
        context.fillRect (barPosition, barY - 3, 3, 13);
        context.restore();

        // Print enemies defeated
        context.save();
        context.font = '15px Boldonse';
        context.fillText(`Enemies Defeated: ${this.totalEnemiesDefeated}`, 12.5, 485);
        context.restore();

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
                    this.defeated();
                }
            } else {
                if (enemy.x > 500 && enemy.directionOdd || enemy.x < 0 && !enemy.directionOdd) {
                    enemy.resetOdd();
                    this.defeated();
                }
            }
            
            // Update Enemy Position
            if (round) {
                enemy.directionEven ? this.moveDown(enemy) : this.moveUp(enemy);
            } else {
                enemy.directionOdd ? this.moveRight(enemy) : this.moveLeft(enemy);
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
                            this.moveDown(enemy.shot);
                            break;
                        case (2):
                            this.moveLeft(enemy.shot);
                            break;
                        case (3):
                            this.moveUp(enemy.shot);
                            break;
                        case (4):
                            this.moveRight(enemy.shot);
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

        // Powerup Indicator
        /*
        if ((this.powerup.y < 0 || this.powerup.y > 500) && this.powerup.happening && !this.powerup.waiting) {
            this.powerup.drawIndicator(context);
        }
        */

        if (!this.powerup.happening) this.powerup.notHappening();

        if (!this.powerup.waiting) {

            this.powerup.direction ? this.moveDown(this.powerup) : this.moveUp(this.powerup);

            this.powerup.draw();

        }

    }

    // ------------------------------------------------------------------
    // MOVEMENT:
    // make used by all for movement, no point in redefining... 
    // although I understand the concept of only updating properties of a class from methods defined inside that class.

    this.moveRight = function(item) {
        item.x += item.speed;
    }
    this.moveLeft = function(item) {
        item.x -= item.speed;
    }
    this.moveUp = function(item) {
        item.y -= item.speed;
    }
    this.moveDown = function(item) {
        item.y += item.speed;
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
    }

    // ------------------------------------------------------------------
    // GENERAL CHECK INTERSECTION:

    this.defeated = function() {
        this.totalEnemiesDefeated += 1;
    }

    this.intersection = function() {
        this.resetEnemies();
        
        this.pause();

        if (this.lives <= 0) {
            return this.dead();
        }

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

            if (ifTop && ifThisLeft || ifBottom && ifThisLeft || ifTop && ifThisRight || ifBottom && ifThisRight) {
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

    this.homeListener = () => this.home();

    this.home = function() {

        canvas.removeEventListener('click', this.homeListener);
        canvas.addEventListener('click', this.pauseController);

        clearInterval(this.welcomeId);


        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, 500, 500);
        context.font = '25px Boldonse';
        context.fillStyle = 'white';
        context.fillText('Welcome to Breakthrough v2!', 28, 250);
        context.font = '15px Boldonse';
        context.fillText('Click anywhere to begin', 135, 290);

    }

    this.slide = 0;
    this.lastTime = new Date().getUTCSeconds();

    this.welcomeSceneHandler = () => this.welcomeScene();

    this.welcome = function() {
        this.welcomeId = setInterval(this.welcomeSceneHandler, 1000);
        this.welcomeScene();
    }

    this.welcomeScene = function() {
        context.fillStyle = '#fff';
        context.fillRect(0, 0, 500, 500);
        context.fillStyle = 'purple';
        switch (this.slide) {
            case (0):
                context.font = '25px Boldonse';
                context.fillText('Welcome to Breakthrough v2!', 28, 250);
                break;
            case (1):
                context.font = '15px Boldonse';
                context.fillText('Use WASD to move the', 50, 260);
                context.fillText('player around the gameboard', 50, 320);
                break;
            case (2):
                context.font = '15px Boldonse';
                context.fillText('Use W A S D to move the', 50, 260);
                context.fillText('player around the gameboard', 50, 320);
                break;
            default:
                clearInterval(this.welcomeId);
                this.home();
                break;
        }

        let thisTime = new Date().getUTCSeconds();
        if (thisTime > this.lastTime + 2) {
            this.lastTime = thisTime;
            this.slide++;
        }
    }

    this.dead = function() {
        this.resetBetween();
        context.fillStyle = '#F10040';
        context.fillRect(0, 0, 500, 500);
        context.fillStyle = 'blue';
        context.font = '25px Boldonse';
        context.fillStyle = 'white';
        context.fillText('You died.', 190, 200);
        context.font = '15px Boldonse';
        context.fillText(`You defeated ${this.totalEnemiesDefeated} enemies.`, 135, 260);
        context.fillText(`You made it to round ${this.round}.`, 155, 310);
        this.resetStats();
    }

    this.respawn = function() {
        this.resetBetween();
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, 500, 500);
        context.fillStyle = 'blue';
        context.fillStyle = 'white';
        context.font = '25px Boldonse';
        context.fillText('You lost a life!', 150, 250);
        context.font = '15px Boldonse';
        context.fillText('Click anywhere to respawn.', 130, 310);
    }

    this.nextRound = function() {
        this.resetBetween();
        context.fillStyle = '#16a34a';
        context.fillRect(0, 0, 500, 500);
        context.fillStyle = '#fff';
        context.font = '25px Boldonse';
        context.fillText(`You completed round ${this.round}!`, 70, 250);
        context.font = '15px Boldonse';
        context.fillText('Click anywhere to continue...', 110, 310);
        this.round++;
        this.resetEnemies();
    }

}