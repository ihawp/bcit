class Bigfoot {
    constructor() {
        this.instructions = document.getElementById('instructions');
        this.bigfoot = document.getElementById('bigfoot');
        this.init();
    }
    init() {
        const startButton = document.getElementById('btn-start');
        startButton.addEventListener('click', this.start);
    }

    placeBigfoot() {

        const bigfoot = document.getElementById('bigfoot');
        let l = Math.random() * 100;
        let q = Math.random() * 100;
        bigfoot.style.top = `${q}%`;
        bigfoot.style.left = `${l}%`;
        bigfoot.style.display = 'block';
        bigfoot.addEventListener('click', this.foundBigfoot);
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