let username = undefined;


const usernameForm = document.getElementById('usernameForm');
const gameBoard = document.getElementById('game');
usernameForm.addEventListener('submit', (event) => {
    event.preventDefault();
    username = event.target.children[1].value;
    usernameForm.style.display = 'none';
    gameBoard.style.display = 'block';
});

gameBoard.addEventListener('click', startGame);

function startGame(event) {
    gameBoard.removeEventListener('click', startGame);


    // Create Enemies
    let enemies = [];
    for (let i = 0; i < 20; i++) {
        enemies.push(new Enemy(i));
    }

    for (let i = 0; i < enemies.length; i++) {
        console.log(enemies[i]);
    }

    // Create Game()
    new Game(enemies, );
}

class Game {
    constructor(username) {
        this.username = username;
        this.player = undefined;
        this.lives = 3;
        this.enemiesDefeated = 0;
        this.init();
    }
    init() {
        let runGame = setInterval(() => {

        }, 0.303030303);
        clearInterval(runGame);
    }
}

class Enemy {
    constructor(direction) {
        this.direction = direction % 2 === 0 ? this.moveLeft : this.moveRight;
        this.x = Math.floor(Math.random() * (500 - 1 + 1) + 1);
        this.y = Math.floor(Math.random() * (500 - 1 + 1) + 1);
        this.this = document.createElement('div');
        this.this.classList.add(`enemy`);
        this.this.classList.add(`${this.direction === this.moveLeft ? 'gunner' : 'boopa'}`);
        document.getElementById('game').innerHTML += this.this;
    }
    moveLeft() {
        this.this.style.left = this.x -= this.speed;
    }
    moveRight() {
        this.this.style.left = this.x += this.speed;
    }
}

class Powerup {
    constructor() {

    }
    Rainbow() {

    }

}
