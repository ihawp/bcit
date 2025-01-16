

class Wow {
    constructor() {
        this.count = document.querySelectorAll('.slide img');
        this.realized = 0;
        this.init();
    }
    init() {
        this.count[0].addEventListener('click', this.next);
    }
    next() {

    }
}

new Wow();

// get buttons from DOM
const left = document.getElementById('btn-turn-clockwise');
const right = document.getElementById('btn-turn-counter-clockwise');


function leftClick() {

}

left.addEventListener('click', leftClick);