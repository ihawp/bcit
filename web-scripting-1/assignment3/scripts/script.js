

class Wow {
    constructor() {
        this.count = document.querySelectorAll('.slide img');
        this.current = 0;
        this.init();
    }
    init() {
        document.getElementById('btn-turn-clockwise').addEventListener('click', this.click.bind(this));
        document.getElementById('btn-turn-counter-clockwise').addEventListener('click', this.click.bind(this));
    }
    updateSlide = () => {
        this.count[this.current].style.display = 'none';
        this.current + 1 === this.count.length ? this.current = 0 : this.current += 1;
        this.count[this.current].style.display = 'block';
    }
    click(event) {
        console.log(this.current);
        this.updateSlide();
        // event.target holds id for button clicked
    }
}

new Wow();

// get buttons from DOM
const left = document.getElementById('btn-turn-clockwise');
const right = document.getElementById('btn-turn-counter-clockwise');


function leftClick() {

}

left.addEventListener('click', leftClick);