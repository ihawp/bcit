import { randomNumberInRange, backgroundColor } from "./functions.js";
import { Enemy } from './enemy.js';
import { Player } from './player.js';

const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");
const lives = document.getElementById('lives');
const round = document.getElementById('round');

export function Game() {
    this.thing = 10;
    this.enemies = [];
    this.players = [];
    this.powerups = undefined;
    this.round = 1;
    this.lives = 3;
    this.totalEnemiesDefeated = 0;
    this.intervalId = undefined;

    this.init = function() {
        
        // Create Enemies
        for (let i = 0; i < 20; i++) this.enemies.push(new Enemy());

        // Create Player(s... potentially)
        for (let i = 0; i < 1; i++) this.players.push(new Player(250, 250));

        // Create PowerUps

        this.start();

        canvas.addEventListener('click', this.pauseController);
        
    }
    this.draw = function() {

        // context.save();

        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, 500, 500);

        // Players
        this.players.forEach(player => {
            player.draw(context);
        });

        // Enemies
        this.enemies.forEach(enemy => {

            // Check if enemy is out of distance.
            if (enemy.x > 500) {
                enemy.x = -(randomNumberInRange(1, 500));

                this.totalEnemiesDefeated += 1;
                context.fillStyle = 'black';
                context.fillText(`${this.totalEnemiesDefeated}`, 250, 250);
                console.log(this.totalEnemiesDefeated);
            }


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
            
            enemy.draw(context);

            // check intersection
            // use radius idea.
            // check radius of player 25px
            // create square in code of enemy / player

        });

        // Powerups (if any active)

        // Lives Count

        // context.restore();

    }
    this.start = function() {
        return this.intervalId = setInterval(() => this.draw(), 33.03030);
    }
    this.pause = function() {
        return clearInterval(this.intervalId);
    }
    this.pauseController = () => {
        if (this.intervalId) {
            return this.intervalId = this.pause();
        }
        this.intervalId = this.start();
    }
}