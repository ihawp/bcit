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
        this.positionX = undefined;
        this.positionY = undefined;
        this.init();
    }

    init() {
        document.getElementById('startGame').addEventListener('click', this.startGame);
        document.getElementById('stopGame').addEventListener('click', this.stopGame);
    }

    startGame = () => {
        this.gameId = setInterval(() => {

            this.doGame();

            this.move();

        }, 50);
    }

    doGame() {

        console.log('wow');

    }

    move = () => {
        document.addEventListener('keypress', (event) => {
            console.log(event);
        });
    }

    stopGame = () => {

        clearInterval(this.gameId);

    }

    generateMenu() {
        this.game.innerHTML = `
        
                <h2>wow things</h2>
        
        `;
    }

    generateBoard() {
        const l = document.createElement('div');
        l.backgroundColor = 'blue';
        l.height = '500px';
        l.width = '500px';
        gameContainer.appendChild(l);

        l.innerText = 'wow';
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
