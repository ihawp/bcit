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
    this.totalEnemiesDefeated = 99;
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

        // Could be swapped to animation start or something prior to game beginning.
        if (this.plays === 0) {
            this.intervalId = this.home();
            canvas.addEventListener('click', this.pauseController);
        } else {
            this.startGame();
        }
    }

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

        this.plays++;
        this.round = 1;
        this.totalEnemiesDefeated = 0;
        this.lives = 3;
        round.innerText = this.round;
        this.setLives();
        enemiesDefeated.innerText = this.totalEnemiesDefeated;

    }

    this.respawn = function() {

        this.resetBetween();

        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, 500, 500);
        context.fillStyle = 'blue';
        context.font = '25px sans-serif';
        context.fillStyle = 'white';
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

    this.draw = function() {

        // context.save();

        // Background
        context.save();
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
        this.player.left = this.player.x;
        this.player.right = this.player.x + this.player.size;
        this.player.top = this.player.y;
        this.player.bottom = this.player.y + this.player.size;

        // Enemies
        this.enemies.forEach(enemy => {

            // Check intersection of enemy and player
            if (this.checkEnemyIntersection(enemy)) {
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
                if (this.checkEnemyShotIntersection(enemy)) {
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
        if (this.checkPowerUpIntersection()) {
            this.powerUpIntersection();
        }
        if (!this.powerup.happening) this.powerup.notHappening();
        if (!this.powerup.waiting) this.powerup.notWaiting();

        // context.restore();

    }

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
    }

    this.intersection = function() {
        this.resetEnemies();
        
        this.pause();

        if (this.lives <= 0) {
            return this.dead();
        }

        this.respawn();
    }

    this.setLives = function() {
        lives.innerText = '';
        for (let i = 0; i < this.lives; i++) {
            lives.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>';
        }
    }

    this.enemyIntersection = function() {

        this.lives--;

        this.intersection();

        this.setLives();

    }

    this.shotIntersection = function() {

        this.lives--;

        this.intersection();

        this.setLives();

    }

    this.checkPowerUpIntersection = function() {
        let powerUpLeft = this.powerup.x;
        let powerUpRight = this.powerup.x + this.powerup.size;
        let powerUpTop = this.powerup.y;
        let powerUpBottom = this.powerup.y + this.powerup.size;

        let ifTop = powerUpTop > this.player.top && powerUpTop < this.player.bottom;
        let ifBottom = powerUpBottom > this.player.top && powerUpBottom < this.player.bottom;
        let ifRight = powerUpRight > this.player.left && powerUpRight < this.player.right;
        let ifLeft = powerUpLeft < this.player.right && powerUpLeft > this.player.left;

        if (ifTop && ifLeft || ifBottom && ifLeft || ifTop && ifRight || ifBottom && ifRight) {
            return 1;
        }
        return 0;
    }

    this.checkEnemyIntersection = function(enemy) {
        let enemyLeft = enemy.x;
        let enemyRight = enemy.x + enemy.size;
        let enemyTop = enemy.y;
        let enemyBottom = enemy.y + enemy.size;

        let ifTop = enemyTop > this.player.top && enemyTop < this.player.bottom;
        let ifBottom = enemyBottom > this.player.top && enemyBottom < this.player.bottom;
        let ifRight = enemyRight > this.player.left && enemyRight < this.player.right;
        let ifLeft = enemyLeft < this.player.right && enemyLeft > this.player.left;

        if (ifTop && ifLeft || ifBottom && ifLeft || ifTop && ifRight || ifBottom && ifRight) {
            return 1;
        }
        return 0;
    }

    this.checkEnemyShotIntersection = function(enemy) {
        let enemyShot = enemy.shot;
        let shotLeft = enemyShot.x;
        let shotRight = enemyShot.x + enemyShot.size;
        let shotTop = enemyShot.y;
        let shotBottom = enemyShot.y + enemyShot.size;

        let ifTop = shotTop > this.player.top && shotTop < this.player.bottom;
        let ifBottom = shotBottom > this.player.top && shotBottom < this.player.bottom;
        let ifRight = shotRight > this.player.left && shotRight < this.player.right;
        let ifLeft = shotLeft < this.player.right && shotLeft > this.player.left;

        if (ifTop && ifLeft || ifBottom && ifLeft || ifTop && ifRight || ifBottom && ifRight) {
            return 1;
        }
        return 0;
    }

    this.powerUpIntersection = function() {

        this.powerup.waiting = true;

        this.powerup.reset();

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
}