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
        let player = document.createElement('div');
        player.setAttribute('id', 'player');
        player.style.width = '25px';
        player.style.height = '25px';
        player.style.backgroundColor = 'blue';
        player.style.bottom = '237.5px';
        player.style.left = '237.5px';
        player.style.position = 'absolute';
        player.style.display = 'none';
        this.game.appendChild(player);

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

        for (let i = 0; i < this.currentRound * 8; i++) {
            this.enemies.push(new Enemy);
        }

        console.log(this.enemies);

        document.addEventListener('keydown', this.keyDown);
        document.addEventListener('keyup', this.keyUp);

        this.gameId = setInterval(() => {

            this.updateEnemyPositions();

            this.updatePosition();

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

            // run game at 30 FPS => timeout 33ms
        }, 33);
    }

    updateEnemyPositions = () => {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].continueMovement();
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
        // update player position.
        let player = document.getElementById('player');
        if (player.style.bottom === '0px') {
            this.stopGame();
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
    constructor(direction) {

        this.positionX = -(Math.round(Math.random() * 1000) / 2);
        this.positionY = (Math.round(Math.random() * 1000) / 2);
        this.speed = Math.random() * 2;
        this.type = undefined;
        this.direction = direction;

        this.html = undefined;
        this.init();
    }

    init = () => {
        this.html = document.createElement('div');
        this.html.style.width = '5px';
        this.html.style.height = '5px';
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
        // check if enemy off screen after travelling across.
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
