import { randomNumberInRange } from "./functions.js";
import { Enemy } from './enemy.js';
import { Player } from './player.js';

export function Game() {
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

        }

        // Powerups (if any active)


        // context.restore();

    }

    // Move an enemy.
    this.moveEnemy = (enemy, context) => {
        enemy.remove(context);
        enemy.update();
        enemy.draw(context);
    }
}