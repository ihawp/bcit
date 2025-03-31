// ihawp.com Canvas API Game

import { Game } from './game.js';

/*


    CURRENT THINGS:

    1. Player offscreen to opposite side not properly implemented
    2. Enemies are printed above the player causing thing 'clearing' purple 
       background to be visible atop the Player.
    3. Enemies object needs more methods for moving to allow for multiple direction
       enemies, so that they can go to left or right or down or up.


*/

const game = new Game();
game.init();