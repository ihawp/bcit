/*

    GOAL: Update the game screen so that we create 30 frames per second (this number may change depending on the whatnot and who how of yada yada)

*/

// set current year in footer
document.getElementById('footerYear').innerText = `${new Date().getFullYear()}`;


class Game {
    constructor() {
        this.username = undefined;
        this.game = document.getElementById('game');
        this.gameId = undefined;
        this.currentRound = 0;
        this.enemies = [];
        this.enemiesDefeated = 0;
        this.lives = 3;
        this.speed = 10;

        this.w = undefined;
        this.a = undefined;
        this.s = undefined;
        this.d = undefined;

        this.init();
    }

    init() {
        this.generateMenu();
        document.getElementById('startGame').addEventListener('click', this.startGame);
        document.getElementById('pauseGame').addEventListener('click', this.pauseGame);
        document.getElementById('stopGame').addEventListener('click', this.stopGame);
    }

    startGame = () => {

        document.getElementById('pauseGame').style.display = 'block';

        document.getElementById('startGame').setAttribute('disabled', 'disabled');
        document.getElementById('startGame').style.display = 'none';
        let player = document.createElement('div');
        player.setAttribute('id', 'player');
        player.style.width = '25px';
        player.style.height = '25px';
        player.style.backgroundColor = 'blue';
        player.style.bottom = '250px';
        player.style.left = '250px';
        player.style.transform = 'translate(-50%, -50%)';
        player.style.position = 'absolute';
        this.game.appendChild(player);

        document.addEventListener('keydown', this.keyDown);
        document.addEventListener('keyup', this.keyUp);

        this.gameId = setInterval(() => {

            this.updatePosition();

            if (this.w) {

                console.log(player.style.bottom);

                console.log(player.style.bottom > '20px');

                player.style.bottom = `${parseInt(player.style.bottom.split('p')[0]) + this.speed}px`;

                if (player.style.bottom.split('p')[0] >= 450) {
                    player.style.bottom = `450px`;

                }

            }

            if (this.a) {
                player.style.left = `${parseInt(player.style.left.split('p')[0]) - this.speed}px`;
                if (player.style.left.split('p')[0] <= 50) {
                    player.style.left = `50px`;

                }
            }
            if (this.s) {

                player.style.bottom = `${parseInt(player.style.bottom.split('p')[0]) - this.speed}px`;


                if (player.style.bottom.split('p')[0] <= 50) {
                    player.style.bottom = `50px`;

                }
                console.log(player.style.bottom);

            }
            if (this.d) {
                player.style.left = `${parseInt(player.style.left.split('p')[0]) + this.speed}px`;
                if (player.style.left.split('p')[0] >= 450) {
                    player.style.left = `450px`;

                }
            }

            // run game at 30 FPS => timeout 33ms
        }, 33);
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
        this.positionX = undefined;
        this.positionY = undefined;
        this.speed = Math.random() * 10;
        this.type = undefined;
        this.direction = direction;
    }

    continueMovement = () => {

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
