// Canvas API

const game = document.getElementById('game');
let context = game.getContext('2d');
context.fillStyle = "green";
context.fillRect(10, 10, 20, 10);
let q = context.getContext;
console.log({q});
console.log(context);


/*
NO CANVAS


function start() {
    game.removeEventListener('click', start);
    new Game();
}

class Game {
    constructor() {
        this.enemies = [];
        this.player = new Player(this.CreateDOMItem(['player'], '237.5px', '237.5px'));
        for (let i = 0; i < 20; i++) this.enemies.push(new Enemy(this.CreateDOMItem(['enemy', i % 2 === 0 ? 'boopa' : 'gunner'], '0px', `${(Math.random() * 500) + 1}px`)));
        this.powerup = new PowerUp(this.CreateDOMItem(['powerup'], '500px', `${Math.floor(Math.random() * 500) + 1}px`));
        this.enemiesDefeated = 0;
        this.Init();
    }

    Init() {
        let id = setInterval(() => {
            this.RunGame();
        }, 33.3333333);
        clearInterval(id);
    }

    CreateDOMItem(classList, x, y) {
        let DOMItem = document.createElement('div');
        DOMItem.style.top = y;
        DOMItem.style.left = x;
        for (let i = 0; i < classList.length; i++) {
            DOMItem.classList.add(classList[i]);
        }
        game.insertAdjacentElement('beforeend', DOMItem);
        return DOMItem;
    }

    RunGame() {
        let id = setInterval(() => {
            console.log('30 fps');
        }, 33.3333333);
        clearInterval(id);
    }

    Reset() {

    }

}


class Player {
    constructor(dom) {
        this.dom = dom;
        document.addEventListener('keydown', this.Move.bind(this));
    }

    Move(event) {
        console.log(event.keyCode);
        switch(event.keyCode) {
            case(87):
                document.documentElement.style.setProperty("--x", `${this.dom.offsetTop - 5}`);
                this.dom.style.top = `${this.dom.offsetTop - 5}px`;
                break;
            case (68):
                this.dom.style.left = `${this.dom.offsetLeft + 5}px`;
                break;
            case (65):
                this.dom.style.left = `${this.dom.offsetLeft - 5}px`;
                break;
            case (83):
                this.dom.style.top = `${this.dom.offsetTop + 5}px`;
                break;
        }
    }
}
class PowerUp {
    constructor(dom) {
        this.dom = dom;
    }
}

class Enemy {
    constructor(dom) {
        this.dom = dom;
    }
}
 */

