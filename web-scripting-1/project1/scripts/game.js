import { randomNumberInRange, convertIntToRoman } from "./functions.js";
import Enemy from './enemy.js';
import { Gunner } from './gunner.js';
import Player from './player.js';
import Powerup from './powerup.js';

const backgroundColor = 'purple';
const framerate = 33.3333333333;

let canvas = document.createElement('canvas');
canvas.id = 'canvas';
canvas.setAttribute('width', '500');
canvas.setAttribute('height', '500');
const context = canvas.getContext("2d");



export default function Game() {

    this.player;
    this.username = 'ihawp';
    this.enemies = [];
    this.powerups = [];
    this.plays = 0;
    this.round = 1;
    this.lives = 3;
    this.totalEnemiesDefeated = 0;

    this.intervalId = undefined;
    this.welcomeId = undefined;

    this.target = 100;

    this.init = function() {
        
        for (let i = 0; i < 20; i++) {
            let enemy = new Enemy(context);
            this.resetEnemy(enemy);
            this.enemies.push(enemy);
        }
        this.player = new Player(237.5, 237.5);

        // Create PowerUps
        this.powerup = new Powerup();

        // Could be swapped to animation start or something prior to game beginning.
        if (this.plays === 0) {
            this.intervalId = this.welcome();
            canvas.addEventListener('click', this.homeListener);
        } else {
            this.startGame();
        }
    }

    this.display = function(main) {
        main.insertAdjacentElement('afterbegin', canvas);
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
        let thisTime = Date.now();
        
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

            // Update Enemy Position
            if (round) {
                enemy.directionEven ? this.moveDown(enemy, enemy.type.speed) : this.moveUp(enemy, enemy.type.speed);
            } else {
                enemy.directionOdd ? this.moveRight(enemy, enemy.type.speed) : this.moveLeft(enemy, enemy.type.speed);
            }

            // Check if enemy is out of distance.
            if (round && (enemy.y > 500 && enemy.directionEven || enemy.y + enemy.type.size < 0 && !enemy.directionEven)) {
                enemy.resetEven();
                this.defeated();
            }
            
            if (!round && (enemy.x > 500 && enemy.directionOdd || enemy.x + enemy.type.size < 0 && !enemy.directionOdd)) {
                enemy.resetOdd();
                this.defeated();
            }
            
            // Draw the enemy in new position.
            enemy.draw(context);

            // Shoot shots
            if (enemy.type instanceof Gunner) {

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

                // Check if enemy shot is happening, if so move the shot
                if (enemy.shot.happening) {
                    switch (enemy.shot.happening) {
                        case (1):
                            this.moveDown(enemy.shot, enemy.shot.speed);
                            break;
                        case (2):
                            this.moveLeft(enemy.shot, enemy.shot.speed);
                            break;
                        case (3):
                            this.moveUp(enemy.shot, enemy.shot.speed);
                            break;
                        case (4):
                            this.moveRight(enemy.shot, enemy.shot.speed);
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

        // Check if powerup has been active for 5 seconds (stop it if so)
        if (this.powerup.active && thisTime - this.powerup.lastTime > 5000) {
            this.cancelPowerup();
        }

        // Check if player has been alive for 15 seconds
        if (thisTime - this.powerup.lastTime > 15000) {

            // Move the powerup
            this.powerup.direction ? this.moveDown(this.powerup, this.powerup.speed) : this.moveUp(this.powerup, this.powerup.speed);

            // Draw the powerup
            this.powerup.draw(context);

            // Check player intersection with Powerup
            if (this.checkIntersection(this.powerup)) {
                this.powerUpIntersection();
            }

            // Check if Powerup is offscreen
            if (this.powerup.y + this.powerup.size < 0 && !this.powerup.direction || this.powerup.y > 500 && this.powerup.direction) {
                this.powerup.reset();
            }

            // Check if Powerup is offscreen for indicator
            if (this.powerup.y + this.powerup.size < 0 && this.powerup.direction || this.powerup.y > 500 && !this.powerup.direction) {
                this.powerup.drawIndicator(context);
            }

        }

    }

    // ------------------------------------------------------------------
    // MOVEMENT:

    this.moveRight = function(item, speed) {
        item.x += speed;
    }
    this.moveLeft = function(item, speed) {
        item.x -= speed;
    }
    this.moveUp = function(item, speed) {
        item.y -= speed;
    }
    this.moveDown = function(item, speed) {
        item.y += speed;
    }
    
    // ------------------------------------------------------------------
    // RESET:

    this.resetEnemy = function(enemy) {
        if (this.round % 2 == 0) {
            enemy.resetEven();
        } else {
            enemy.resetOdd();
        }
        if (enemy.type instanceof Gunner) {
            enemy.adjustShot();
        }
    }

    this.resetEnemies = function() {
        this.enemies.forEach(enemy => this.resetEnemy(enemy));
    }

    this.resetBetween = function() {
        this.player.reset();
        this.resetEnemies();
        this.powerup.reset();
    }

    // Reset the player/game stats
    this.resetStats = function() {
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

    this.cancelPowerup = () => {
        this.setEnemiesSpeed(5);
        this.resetEnemiesSize();
        this.player.invincibility(false);
        this.player.setSpeed(5);
        this.powerup.setActive(false);
    }

    this.powerUpIntersection = function() {

        this.powerup.reset();
        this.powerup.setActive(true);

        switch (this.powerup.type) {
            case (0):
                // Slowdown
                this.setEnemiesSpeed(1);
                break;
            case (1):
                // Rainbow
                this.setEnemiesSpeed(10);
                this.setEnemiesSize(0);
                this.player.invincibility(true);
                break;
            case (2):
                // Trick (this one is dumb)
                this.player.setSpeed(3);
                break;
            case (3):
                // Free Life
                this.lives++;
                break;
        }

    }

    this.enemyIntersection = function() {

        this.removeLife();

        this.intersection();

    }

    this.shotIntersection = function() {

        this.removeLife();

        this.intersection();

    }

    // ------------------------------------------------------------------
    // SET VALUE(s):

    this.addLife = function() {
        this.lives++;
    }

    this.removeLife = function() {
        this.lives--;
    }

    this.setEnemiesSpeed = function(speed) {
        this.enemies.forEach(enemy => {
            enemy.setSpeed(speed);
            enemy.setShotSpeed(speed * 1.6);
        });
    }

    this.setEnemiesSize = function(size) {
        this.enemies.forEach(enemy => {
            enemy.setSize(size);
            enemy.setShotSize(size);
        });
    }

    this.resetEnemiesSize = function() {
        this.enemies.forEach(enemy => {
            enemy.type instanceof Gunner ? enemy.setSize(13) : enemy.setSize(8);
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
    this.lastTime = Date.now();

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
                context.fillText('Your player can go over the edge', 50, 260);
                context.fillText('of the gameboard and appear on the', 50, 320);
                context.fillText('opposing edge.', 50, 380);
                break;
            default:
                clearInterval(this.welcomeId);
                this.home();
                break;
        }

        let thisTime = Date.now();
        if (thisTime - this.lastTime > 2000) {
            this.lastTime = thisTime;
            this.slide++;
        }
    }

    this.dead = async function() {

        let response = await fetch('http://localhost/project1/php/leaderboard.php', {
            method: "POST",
            header: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.username,
                enemiesDefeated: this.totalEnemiesDefeated,
                roundLost: this.round,
            })
        });
        if (!response.ok) {
            console.error(response);
        } else {
            console.log(response);
        }

        this.addPlay();
        context.fillStyle = '#F10040';
        context.fillRect(0, 0, 500, 500);
        context.fillStyle = 'blue';
        context.font = '25px Boldonse';
        context.fillStyle = 'white';
        context.fillText('You died.', 190, 200);
        context.font = '15px Boldonse';
        context.fillText(`You defeated ${this.totalEnemiesDefeated} enemies.`, 135, 260);
        context.fillText(`You made it to round ${this.round}.`, 155, 310);
        context.fillText(`You have played ${this.plays} times.`, 150, 360);
        this.resetStats();
        this.resetBetween();
    }

    this.addPlay = function() {
        this.plays++;
    }

    this.addRound = function() {
        this.round++;
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
        this.addRound();
        this.resetEnemies();
    }

}