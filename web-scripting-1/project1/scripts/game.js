import { randomNumberInRange } from "./functions.js";
import { Enemy } from './enemy.js';
import { Player } from './player.js';
import { canvas, context, framerate } from './main.js';
const lives = document.getElementById('lives');
const round = document.getElementById('round');
const enemiesDefeated = document.getElementById('enemies-defeated');
const backgroundColor = 'purple';

export function Game() {
    this.enemies = [];
    this.player;
    this.powerups = undefined;
    this.plays = 0;
    this.round = 1;
    this.lives = 3;
    this.totalEnemiesDefeated = 0;
    this.intervalId = undefined;

    this.init = function() {
        
        for (let i = 0; i < 20; i++) this.enemies.push(new Enemy());
        this.player = new Player(250, 250);

        // Create PowerUps


        // Could be swapped to animation start or something prior to game beginning.
        if (this.plays === 1) {
            this.startWelcome();
        } else {
            this.startGame();
            canvas.addEventListener('click', this.pauseController);
        }
    }
    this.welcome = function() {

        context.fillStyle = 'red';
        context.fillRect(0, 0, 500, 500);

        context.fillStyle = 'blue';
        context.fillText('Welcome to Breakthrough v2', 250, 250);

        setTimeout(() => {
            console.log('5 seconds later');
        }, 5000);

    }
    this.draw = function() {

        // context.save();

        // Background
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, 500, 500);

        // Players
        this.player.draw(context);

        // player square.
        let playerLeft = this.player.x;
        let playerRight = this.player.x + this.player.size;
        let playerTop = this.player.y;
        let playerBottom = this.player.y + this.player.size;

        // Enemies
        this.enemies.forEach(enemy => {

            /* For enemy out of distance reset... etc.
            // All for ODD
            this.y = randomNumberInRange(1, 500);
            this.x = -(randomNumberInRange(1, 500));
            this.xAlt = randomNumberInRange(500, 1000);

            // All for EVEN
            this.yEven = -(randomNumberInRange(1, 500));
            this.xEven = randomNumberInRange(1, 500);
            this.yAlt = randomNumberInRange(500, 1000);
            */
            // Check if enemy is out of distance.
            if (enemy.x > 500 && enemy.directionOdd ) {
                enemy.x = -(randomNumberInRange(1, 500));
                enemiesDefeated.innerText = this.totalEnemiesDefeated += 1;
            }

            

            // Update Enemy Position
            if (this.enemiesDefeated > 1) {

            } else {
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
            }
            
            // Draw the enemy in new position.
            enemy.draw(context);

            // Check Intersection
            let enemyLeft = enemy.x;
            let enemyRight = enemy.x + enemy.size;
            let enemyTop = enemy.y;
            let enemyBottom = enemy.y + enemy.size;

            // Named based on side of enemy that would be 'hit'
            let ifBottom = enemyTop < playerTop && enemyTop > playerBottom;
            let ifTop = enemyBottom > playerTop && enemyBottom < playerBottom;
            let ifLeft = enemyRight > playerLeft && enemyRight < playerRight;
            let ifRight = enemyLeft < playerRight && enemyLeft > playerLeft;

            if (ifTop && ifLeft || ifBottom && ifLeft) {
                console.log('RIGHT SIDE');
                this.pause();
            }
            if (ifTop && ifRight || ifBottom && ifRight) {
                console.log('LEFTw SIDE');
                this.pause();
            }

        });

        // Powerups (if any active)

        // Lives Count

        // context.restore();

    }
    this.startWelcome = function() {
        return this.intervalId = setInterval(() => this.welcome(), framerate);
    }
    this.startGame = function() {
        return this.intervalId = setInterval(() => this.draw(), framerate);
    }
    this.pause = function() {
        return clearInterval(this.intervalId);
    }
    this.pauseController = () => {
        if (this.intervalId) {
            return this.intervalId = this.pause();
        }
        this.intervalId = this.startGame();
    }
}