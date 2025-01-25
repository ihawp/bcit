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
        this.generateMenu();
        document.getElementById('startGame').addEventListener('click', this.startGame);
        document.getElementById('pauseGame').addEventListener('click', this.pauseGame);
        document.getElementById('stopGame').addEventListener('click', this.stopGame);
    }

    startGame = () => {

        document.getElementById('startGame').setAttribute('disabled', 'disabled');


        let player = document.createElement('div');
        player.setAttribute('id', 'player');
        player.style.width = '25px';
        player.style.height = '25px';
        player.style.backgroundColor = 'blue';
        player.style.bottom = '237.5px';
        player.style.left = '237.5px';
        player.style.position = 'absolute';
        this.game.appendChild(player);

        document.addEventListener('keydown', this.keyDown);

        this.gameId = setInterval(() => {

            this.updatePosition();

        }, 50);
    }

    keyDown = (event) => {
        console.log(event.key);
        let player = document.getElementById('player');

        let l = player.style.bottom.split('p');
        let calc = parseInt(l[0]) + this.speed;

        switch(event.key) {
            case ('w'):
                // update player position.

                console.log(player);

                // down for now, will move

                l = player.style.bottom.split('p');
                calc = parseInt(l[0]) + this.speed;

                player.style.bottom = `${calc}px`;
                break;
            case ('a'):
                // update player position.

                console.log(player);

                // down for now, will move

                l = player.style.left.split('p');
                calc = parseInt(l[0]) - this.speed;

                player.style.left = `${calc}px`;
                break;
            case ('s'):
                // update player position.

                console.log(player);

                // down for now, will move

                l = player.style.bottom.split('p');
                calc = parseInt(l[0]) - this.speed;

                player.style.bottom = `${calc}px`;
                break;
            case ('d'):
                // update player position.

                console.log(player);

                // down for now, will move

                l = player.style.left.split('p');
                calc = parseInt(l[0]) + this.speed;

                player.style.left = `${calc}px`;
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
        
            <button id="startGame" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">start</button>
        
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

}

new Game;
