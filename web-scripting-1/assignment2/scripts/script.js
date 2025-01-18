class Bigfoot {
    constructor() {
        this.instructions = document.getElementById('instructions');
        this.bigfoot = document.getElementById('bigfoot');
        this.startButton = document.getElementById('btn-start');
        this.init();
    }
    init() {
        this.startButton.addEventListener('click', this.start);
    }

    placeBigfoot() {
        let l = Math.random() * 100;
        console.log(l);
        console.log(l);

        let q = Math.random() * 100;
        this.bigfoot.style.top = `${q}%`;
        this.bigfoot.style.left = `${l}%`;
        this.bigfoot.style.display = 'block';
        this.bigfoot.addEventListener('click', this.foundBigfoot);
    }

    foundBigfoot = () => {
        if (confirm('Arghhh! You found me. Do you want to play again?')) {
            this.instructions.style.display = 'block';
            this.bigfoot.style.display = 'none';
        }
    }

    start = () => {
        alert(`Find Bigfoot in the forest and click on him!`);
        this.instructions.style.display = 'none';
        this.placeBigfoot();
    }
}

new Bigfoot;