class Bigfoot {
    constructor() {
        this.init();
    }
    init() {
        document.getElementById('btn-start').addEventListener('click', this.start);
    }

    placeBigfoot() {
        const bigfoot = document.getElementById('bigfoot');
        let l = Math.random() * 100;
        let q = Math.random() * 100;
        bigfoot.style.top = `${q}%`;
        bigfoot.style.left = `${l}%`;
        bigfoot.style.display = 'block';
        bigfoot.addEventListener('click', this.foundBigfoot);
        return 0;
    }

    foundBigfoot() {
        if (confirm('Arghhh! You found me. Do you want to play again?')) {
            document.getElementById('instructions').style.display = 'block';
            document.getElementById('bigfoot').style.display = 'none';
        }
        return 0;
    }

    start = () => {
        alert(`Find Bigfoot in the forest and click on him!`);
        document.getElementById('instructions').style.display = 'none';
        this.placeBigfoot();
    }
}

new Bigfoot;