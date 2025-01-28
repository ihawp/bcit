/*

    GOAL: Update the game screen so that we create 30 frames per second (this number may change depending on the whatnot and who how of yada yada)

*/
document.getElementById('mobile-nav').addEventListener('click', (event) => {
    event.target.style.display = 'none';
    event.target.nextElementSibling.style.display = 'flex';
    event.target.previousElementSibling.style.display = 'inline';
});
document.getElementById('remove-mobile-nav').addEventListener('click', (event) => {
    event.target.style.display = 'none';
    event.target.nextElementSibling.style.display = 'inline';
    event.target.nextElementSibling.nextElementSibling.style.display = 'none';
});

// set current year in footer
document.getElementById('footerYear').innerText = `${new Date().getFullYear()}`;


class Game {
    constructor(username) {
        this.username = username;
        this.game = document.getElementById('game');

        this.gameId = undefined;
        this.enemiesId = undefined;
        this.powerupId = undefined;

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

        this.stopped = true;

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
    }

    startGame = () => {

        this.stopped = !this.stopped;

        document.getElementById('pauseGame').style.display = 'inline';

        let player = document.getElementById('player');
        player.style.display = 'inline';

        document.getElementById('pauseGame').style.display = 'block';

        document.getElementById('startGame').setAttribute('disabled', 'disabled');
        document.getElementById('startGame').style.display = 'none';

        document.addEventListener('keydown', this.keyDown);
        document.addEventListener('keyup', this.keyUp);

        this.gameId = setInterval(() => {

            this.updateEnemyPositions();

            this.updatePosition();

            // run game at 30 FPS => timeout 33ms
        }, 33);

        // add power up every 20 seconds
        this.powerupId = setInterval(() => {
            new PowerUp('down', this.stopGame);
        }, 20000);

        this.enemiesId = setInterval(() => {
            for (let i = 0; i < 1; i++) {
                this.enemies.push(new Enemy('right', this.stopGame));
            }
        }, 5000);
    }

    updateEnemyPositions = () => {
        this.enemies.map((item) => {
            item.checkRemove();
            item.continueMovement();
            item.checkIntersection();
        })
    }


    // PLAYER MOVEMENT
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

        /*

        THIS CODE CAUSES BOUNCING OFF THE EDGES:

        let player = document.getElementById('player');

        const bottomF = player.style.bottom.split('p')[0];
        const leftF = player.style.left.split('p')[0];
        const bottom = parseInt(bottomF);
        const left = parseInt(leftF);

        if (this.w) {
            player.style.bottom = `${bottom + this.speed}px`;
            if (bottomF >= 476) { player.style.bottom = `475px`; }
        }
        if (this.a) {
            player.style.left = `${left - this.speed}px`;
            if (leftF <= -1) { player.style.left = `0px`; }
        }
        if (this.s) {
            player.style.bottom = `${bottom - this.speed}px`;
            if (bottomF <= 0) { player.style.bottom = `1px`; }

        }
        if (this.d) {
            player.style.left = `${left + this.speed}px`;
            if (leftF >= 476) { player.style.left = `475px`; }
        }
         */

        let player = document.getElementById('player');

        if (this.w) {
            player.style.bottom = `${parseInt(player.style.bottom.split('p')[0]) + this.speed}px`;
            if (player.style.bottom.split('p')[0] >= 476) player.style.bottom = `475px`;
        }
        if (this.a) {
            player.style.left = `${parseInt(player.style.left.split('p')[0]) - this.speed}px`;
            if (player.style.left.split('p')[0] <= -1) player.style.left = `0px`;
        }
        if (this.s) {
            player.style.bottom = `${parseInt(player.style.bottom.split('p')[0]) - this.speed}px`;
            if (player.style.bottom.split('p')[0] <= 0) player.style.bottom = `1px`;
        }
        if (this.d) {
            player.style.left = `${parseInt(player.style.left.split('p')[0]) + this.speed}px`;
            if (player.style.left.split('p')[0] >= 476) player.style.left = `475px`;
        }


    }
    // END OF PLAYER MOVEMENT

    pauseGame = () => {

        document.getElementById('pauseGame').style.display = 'none';

        let start = document.getElementById('startGame');
        start.removeAttribute('disabled');
        start.style.display = 'block';

        clearInterval(this.enemiesId);
        clearInterval(this.gameId);
        clearInterval(this.powerupId);

    }

    stopGame = () => {

        if (!this.stopped) {
            this.stopped = !this.stopped;
            this.game.innerHTML += 'You lost!';

            document.removeEventListener('keydown', this.keyDown);
            document.removeEventListener('keyup', this.keyUp);

            clearInterval(this.gameId);
            clearInterval(this.enemiesId);
            clearInterval(this.powerupId);
        }

    }

    generateMenu() {
        this.game.innerHTML = `

            <h2 class="width-height-none">${this.username}</h2>

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

        this.stopped = false;

        this.html = undefined;
        this.init();
    }

    init = () => {
        this.html = document.createElement('div');
        this.html.style.width = '15px';
        this.html.style.height = '15px';
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
        console.log(this.html.style.left);
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

        let checkEnemyRight = (thisHTMLLeft + 15) - documentPlayerLeft >= 0 && (thisHTMLLeft + 15) - documentPlayerLeft <= 25;

        let checkEnemyLeft = thisHTMLLeft - (documentPlayerLeft + 25) <= 0 && thisHTMLLeft - (documentPlayerLeft + 25) >= -25;

        let checkEnemyTop = (thisHTMLBottom + 15) - documentPlayerBottom >= 0 && (thisHTMLBottom + 15) - documentPlayerBottom <= 25;

        let checkEnemyBottom = thisHTMLBottom - (documentPlayerBottom + 25) <= 0 && thisHTMLBottom - (documentPlayerBottom + 25) >= -25;


        const check = () => {
            if (checkEnemyLeft) {
                this.stopGame();
            }
            if (checkEnemyRight) {
                this.stopGame();
            }
        }

        if (checkEnemyTop) {
            check();
        }

        if (checkEnemyBottom) {
            check();
        }

    }

}

class PowerUp extends Enemy {
    wow = () => {
        this.type = 'wow';
    }
}

document.getElementById('usernameForm').addEventListener('submit', (event) => {
    event.preventDefault();
    new Game(event.target[0].value);
    document.getElementById('game').style.display = 'block';
    document.getElementById('welcome').style.display = 'none';
});
