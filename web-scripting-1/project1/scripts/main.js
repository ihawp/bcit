/*

    GOAL: Update the game screen so that we create 30 frames per second (this number may change depending on the whatnot and who how of yada yada)

*/

// set current year in footer
document.getElementById('footerYear').innerText = `${new Date().getFullYear()}`;


class Game {
    constructor() {
        this.username = 'ihawp';
        this.game = document.getElementById('game');

        this.gameId = undefined;
        this.enemiesId = undefined;

        this.player = undefined;

        this.currentRound = 1;
        this.enemies = [];
        this.enemiesDefeated = 0;
        this.lives = 3;
        this.speed = 10;

        this.w = false;
        this.a = false;
        this.s = false;
        this.d = false;

        this.init();
    }

    init() {
        this.generateMenu();

        // generate player
        this.player = document.createElement('div');
        this.player.setAttribute('id', 'player');
        this.player.style.width = '25px';
        this.player.style.height = '25px';
        this.player.style.backgroundColor = 'blue';
        this.player.style.bottom = '237.5px';
        this.player.style.left = '237.5px';
        this.player.style.position = 'absolute';
        this.player.style.display = 'none';
        this.game.appendChild(this.player);

        document.getElementById('startGame').addEventListener('click', this.startGame);
        document.getElementById('pauseGame').addEventListener('click', this.pauseGame);
        document.getElementById('stopGame').addEventListener('click', this.stopGame);
    }

    startGame = () => {


        let player = document.getElementById('player');
        player.style.display = 'block';

        document.getElementById('pauseGame').style.display = 'block';

        document.getElementById('startGame').setAttribute('disabled', 'disabled');
        document.getElementById('startGame').style.display = 'none';

        console.log(this.enemies);

        document.addEventListener('keydown', this.keyDown);
        document.addEventListener('keyup', this.keyUp);

        this.gameId = setInterval(() => {

            this.updateEnemyPositions();

            this.updatePosition();

            // run game at 30 FPS => timeout 33ms
        }, 33);

        this.enemiesId = setInterval(() => {
            for (let i = 0; i < this.currentRound * 8; i++) {
                this.enemies.push(new Enemy('left', this.stopGame));
            }
        }, 5000);
    }

    updateEnemyPositions = () => {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].checkRemove();
            this.enemies[i].continueMovement();
            this.enemies[i].checkIntersection();
        }
    }

    keyUp = (event) => {
        switch (event.key) {
            case ('w'):
                this.w = false;
                break;
            case ('a'):
                this.a = false;
                break;
            case ('s'):
                this.s = false;
                break;
            case ('d'):
                this.d = false;
                break;
            case (' '):
                // press spacebar and you can jump forward 5 button presses?
                // or like equiv
                event.preventDefault();
                break;
        }
    }

    keyDown = (event) => {
        switch (event.key) {
            case ('w'):
                this.w = true;
                break;
            case ('a'):
                this.a = true;
                break;
            case ('s'):
                this.s = true;
                break;
            case ('d'):
                this.d = true;
                break;
            case (' '):
                event.preventDefault();

                break;
        }
    }

    updatePosition = () => {
        let player = document.getElementById('player');
        if (this.w) {

            player.style.bottom = `${parseInt(player.style.bottom.split('p')[0]) + this.speed}px`;

            if (player.style.bottom.split('p')[0] >= 476) {
                player.style.bottom = `475px`;

            }

        }

        if (this.a) {
            player.style.left = `${parseInt(player.style.left.split('p')[0]) - this.speed}px`;
            if (player.style.left.split('p')[0] <= -1) {
                player.style.left = `0px`;

            }
        }
        if (this.s) {

            player.style.bottom = `${parseInt(player.style.bottom.split('p')[0]) - this.speed}px`;


            if (player.style.bottom.split('p')[0] <= 0) {
                player.style.bottom = `1px`;

            }

        }
        if (this.d) {
            player.style.left = `${parseInt(player.style.left.split('p')[0]) + this.speed}px`;
            if (player.style.left.split('p')[0] >= 476) {
                player.style.left = `475px`;

            }
        }


    }

    pauseGame = () => {

        let start = document.getElementById('startGame');
        start.removeAttribute('disabled');
        start.style.display = 'block';

        clearInterval(this.gameId);

    }

    stopGame = () => {

        clearInterval(this.gameId);

    }

    generateMenu() {
        this.game.innerHTML = `

            <button id="pauseGame" class="absolute absolute-top-right">pause</button>
            <button id="startGame" class="absolute absolute-center">start</button>
        
        `;
    }


}

class Enemy {
    constructor(direction, stopGame) {

        this.positionX = -(Math.round(Math.random() * (500 - 1 + 1) + 1));
        this.positionY = (Math.round(Math.random() * 1000) / 2);
        this.speed = Math.random() * (5 - 1 + 1) + 1;
        this.type = undefined;
        this.direction = direction;

        this.stopGame = stopGame;

        this.html = undefined;
        this.init();
    }

    init = () => {
        this.html = document.createElement('div');
        this.html.style.width = '25px';
        this.html.style.height = '25px';
        this.html.style.position = 'absolute';
        this.html.style.backgroundColor = 'green';
        this.html.style.bottom = this.positionY + 'px';
        this.html.style.left = this.positionX + 'px';
        document.getElementById('game').appendChild(this.html);
    }

    continueMovement = () => {
        this.html.style.left = `${parseInt(this.html.style.left.split('p')[0]) + this.speed}px`;
    }

    checkRemove = () => {


        if (parseInt(this.html.style.left.split('p')[0]) >= 500) {
            this.html.remove();
        }
        // check if enemy off screen after travelling across.
    }

    checkIntersection = () => {

        let thisHTMLLeft = parseInt(this.html.style.left.split('p')[0]);
        let thisHTMLBottom = parseInt(this.html.style.bottom.split('p')[0]);
        let documentPlayerLeft = parseInt(document.getElementById('player').style.left.split('p')[0]);
        let documentPlayerBottom = parseInt(document.getElementById('player').style.bottom.split('p')[0]);

        // calculate intersection

        // axis: x, y
        // x: top
        // y: bottom

        // need to outline cube in math... but what if I want custom shape?
        // these functionality should be quick since it will be fired and check so often no matter what.


        if ((thisHTMLLeft + 25) - documentPlayerLeft <= 12.5 && (thisHTMLLeft + 25) - documentPlayerLeft >= 0 && (thisHTMLLeft + 25) - documentPlayerLeft <= 12.5 && (thisHTMLLeft + 25) - documentPlayerLeft >= 0) {
            console.log(parseInt(this.html.style.left.split('p')[0]) - parseInt(document.getElementById('player').style.left.split('p')[0]));
            console.log('wow');

            this.stopGame();

        }
    }

}

class Powerup extends Enemy {
    wow = () => {
        console.log('wow');

        this.type = 'wow';
        console.log(this.type);
    }
}

new Game;
