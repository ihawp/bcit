class HorizontalCarousel {
    constructor() {
        this.count = document.querySelectorAll('.slide img');
        this.current = 0;
        this.init();
    }
    init() {
        document.getElementById('btn-turn-clockwise').addEventListener('click', this.click.bind(this));
        document.getElementById('btn-turn-counter-clockwise').addEventListener('click', this.click.bind(this));
        this.count.forEach((item, keys) => {
           keys === 0 ? '' : item.style.display = 'none' ;
        });
    }
    removeCurrent() {
        this.count[this.current].style.display = 'none';
    }

    click(event) {
        // remove thing on screen at time of clicking
        this.removeCurrent();
        event.target.id === 'btn-turn-clockwise' ? this.current -= 1 : this.current += 1;

        // check for which button was clicked determining increment
        if (this.current === -1) {
            this.current = this.count.length - 1;
        }
        if (this.current >= this.count.length) {
            this.current = 0
        }
        this.count[this.current].style.display = 'block';
    }
}

new HorizontalCarousel;
