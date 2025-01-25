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
        this.currentEnemies = [];
        this.enemiesDefeated = 0;
        this.lives = 3;
        this.speed = 10;
        this.init();
    }

    init() {
        document.getElementById('startGame').addEventListener('click', this.startGame);
        document.getElementById('pauseGame').addEventListener('click', this.pauseGame);
        document.getElementById('stopGame').addEventListener('click', this.stopGame);
    }

    startGame = () => {

        document.getElementById('startGame').setAttribute('disabled', 'disabled');


        let player = document.createElement('div');
        player.setAttribute('id', 'player');
        player.style.width = '50px';
        player.style.height = '50px';
        player.style.backgroundColor = 'blue';
        player.style.bottom = '225px';
        player.style.left = '225px';
        player.style.position = 'absolute';
        this.game.appendChild(player);

        document.addEventListener('keydown', this.keyDown);

        this.gameId = setInterval(() => {

            this.doGame();

        }, 50);
    }

    keyDown = (event) => {
        event.preventDefault();
        console.log(event.key);
        switch(event.key) {
            case ('w'):
                this.doGame();
                break;
            case ('a'):
                break;
            case ('s'):
                break;
            case ('d'):
                break;
            case (' '):
                break;
        }
    }

    doGame = () => {

        // update player position.
        let player = document.getElementById('player');

        console.log(player);

        // down for now, will move

        let l = player.style.bottom.split('p');
        let calc = parseInt(l[0]) - this.speed;

        player.style.bottom = `${calc}px`;

        if (player.style.bottom === '25px') {
            this.stopGame();
        }


        // update enemy positions.

    }

    pauseGame = () => {

        document.getElementById('startGame').removeAttribute('disabled');


        clearInterval(this.gameId);

    }

    stopGame = () => {

        clearInterval(this.gameId);

    }

    generateMenu() {
        this.game.innerHTML = `
        
                <h2>wow things</h2>
        
        `;
    }


}

class Enemy {
    constructor() {
        this.positionX = undefined;
        this.positionY = undefined;
        this.speed = undefined;
        this.type = undefined;
        this.direction = undefined;
    }

    updatePosition() {
        if (!this.direction) {
            return this.positionY -= this.speed;
        }
    }

}

let l = new Game;
l.generateMenu();
