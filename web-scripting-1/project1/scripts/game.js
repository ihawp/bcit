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
        for (let i = 0; i < 2; i++) {
            this.powerups.push(new PowerUp());
        }


        // Could be swapped to animation start or something prior to game beginning.
        if (this.plays === 0) {
            this.intervalId = this.home();
            canvas.addEventListener('click', this.pauseController);
        } else {
            this.startGame();
        }
    }

    this.home = function() {

        // Clean up.
        context.save();
        context.fillStyle = 'red';
        context.fillRect(0, 0, 500, 500);
        context.save();
        context.fillStyle = 'blue';
        context.fillText('Welcome to Breakthrough v2', 250, 250);
        context.fillText('Click anywhere to begin', 250, 270);
        context.restore();

    }

    this.welcome = function() {
        // animation showing how to play game or something?
    }

    this.dead = function() {

        this.resetBetween();

        // Clean up.
        context.save();
        context.fillStyle = 'red';
        context.fillRect(0, 0, 500, 500);
        context.save();
        context.fillStyle = 'blue';
        context.fillText('You died.', 250, 250);
        context.fillText(`You defeated ${this.totalEnemiesDefeated} enemies.`, 250, 270);
        context.fillText(`You made it to round ${this.round}`, 250, 290);
        context.restore();

        this.plays++;
        this.round = 1;
        this.totalEnemiesDefeated = 0;
        this.lives = 3;
        round.innerText = this.round;
        lives.innerText = this.lives;

    }

    this.respawn = function() {

        this.resetBetween();

        // Clean up.
        context.save();
        context.fillStyle = 'red';
        context.fillRect(0, 0, 500, 500);
        context.save();
        context.fillStyle = 'blue';
        context.fillText('You died.', 250, 250);
        context.fillText('Click anywhere to respawn.', 250, 270);
        context.restore();

    }

    this.nextRound = function() {

        this.resetBetween();

        // Clean up.
        context.save();
        context.fillStyle = 'green';
        context.fillRect(0, 0, 500, 500);
        context.save();
        context.fillStyle = 'black';
        context.fillText(`You completed round ${this.round}!`, 250, 250);
        context.fillText('Click anywhere to respawn.', 250, 270);
        context.restore();

        this.round++;
        round.innerText = this.round;

    }

    this.draw = function() {

        // context.save();

        // Background
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, 500, 500);

        // Check Round Completion
        if (this.totalEnemiesDefeated >= this.round * 100) {
            this.pause();
            return this.nextRound();
        }

        // Players
        this.player.draw(context);

        // Player square.
        let playerLeft = this.player.x;
        let playerRight = this.player.x + this.player.size;
        let playerTop = this.player.y;
        let playerBottom = this.player.y + this.player.size;

        // Enemies
        this.enemies.forEach(enemy => {

            // Check intersection of enemy and player
            let enemyLeft = enemy.x;
            let enemyRight = enemy.x + enemy.size;
            let enemyTop = enemy.y;
            let enemyBottom = enemy.y + enemy.size;

            let ifTop = enemyTop > playerTop && enemyTop < playerBottom;
            let ifBottom = enemyBottom > playerTop && enemyBottom < playerBottom;
            let ifRight = enemyRight > playerLeft && enemyRight < playerRight;
            let ifLeft = enemyLeft < playerRight && enemyLeft > playerLeft;

            if (ifTop && ifLeft || ifBottom && ifLeft || ifTop && ifRight || ifBottom && ifRight) {
                this.enemyIntersection();
            }

            // Check if enemy is out of distance.
            if (enemy.x > 500 && enemy.directionOdd || enemy.x < 0 && !enemy.directionOdd) {
                enemy.resetOdd();
                enemiesDefeated.innerText = this.totalEnemiesDefeated += 1;
            }
            if (enemy.y > 500 && enemy.directionEven || enemy.y < 0 && !enemy.directionEven) {
                enemy.resetEven();
                enemiesDefeated.innerText = this.totalEnemiesDefeated += 1;
            }

            // Update Enemy Position
            if (this.round % 2 == 0) {
                if (enemy.directionEven) {
                    enemy.moveUp();
                } else {
                    enemy.moveDown();
                }
            } else {
                if (enemy.directionOdd) {
                    enemy.moveRight();
                } else {
                    enemy.moveLeft();
                }
            }

            // Draw the enemy in new position.
            enemy.draw(context);

            // Shoot shots
            if (enemy.type === 0) {
                if (!enemy.shot.current) {
                    enemy.adjustShot();
                    enemy.shot.current = randomNumberInRange(1, 4);
                    setTimeout(() => enemy.shot.current = false, 5000);
                }

                // Check intersection of shot and player
                let enemyShot = enemy.shot;
                let shotLeft = enemyShot.x;
                let shotRight = enemyShot.x + enemyShot.size;
                let shotTop = enemyShot.y;
                let shotBottom = enemyShot.y + enemyShot.size;
    
                ifTop = shotTop > playerTop && shotTop < playerBottom;
                ifBottom = shotBottom > playerTop && shotBottom < playerBottom;
                ifRight = shotRight > playerLeft && shotRight < playerRight;
                ifLeft = shotLeft < playerRight && shotLeft > playerLeft;
    
                if (ifTop && ifLeft || ifBottom && ifLeft || ifTop && ifRight || ifBottom && ifRight) {
                    this.shotIntersection();
                }

                switch (enemy.shot.current) {
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

        });

        // Powerups (if any active)
        this.powerups.forEach(powerup => {

            let powerUpLeft = powerup.x;
            let powerUpRight = powerup.x + powerup.size;
            let powerUpTop = powerup.y;
            let powerUpBottom = powerup.y + powerup.size;

            let ifTop = powerUpTop > playerTop && powerUpTop < playerBottom;
            let ifBottom = powerUpBottom > playerTop && powerUpBottom < playerBottom;
            let ifRight = powerUpRight > playerLeft && powerUpRight < playerRight;
            let ifLeft = powerUpLeft < playerRight && powerUpLeft > playerLeft;

            if (ifTop && ifLeft || ifBottom && ifLeft || ifTop && ifRight || ifBottom && ifRight) {
                this.powerUpIntersection();
            }

            if (!powerup.happening) {
                powerup.reset();
                powerup.happening = true;
                setTimeout(() => powerup.happening = false, 30000); 
            }
            powerup.type ? powerup.moveDown() : powerup.moveUp();
            powerup.draw();

        });

        // Lives Count

        // context.restore();

    }

    this.resetEnemy = function(enemy) {
        if (this.round % 2 === 0) {
            enemy.resetEven();
        } else {
            enemy.resetOdd();
        }
    }

    this.resetEnemies = function() {
        this.enemies.forEach(enemy => this.resetEnemy(enemy));
    }

    this.resetBetween = function() {
        this.player.reset();
        this.resetEnemies();
    }

    this.enemyIntersection = function() {

        this.resetEnemies();
        
        this.pause();

        if (this.lives === 0) {
            return this.dead();
        }

        this.respawn();

        this.lives--;
        lives.innerText = this.lives;

    }

    this.shotIntersection = function() {

        this.pause();

    }

    this.powerUpIntersection = function() {

        this.pause();

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