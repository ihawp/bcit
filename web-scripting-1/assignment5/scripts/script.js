/*

    Warren Chemerika
    BCIT | Web Scripting 1
    Assignment 5

*/

class CatGame {
    constructor() {
        this.name = undefined;

        this.gameOutput = {
            "btn-food-plus": {
                numb: document.getElementById('hunger-out'),
                output: document.getElementById('message-out-hunger'),
                thanks: "Yummy! Thank you for the food!",
                10: "I'm full",
                9: "I'm hungry!",
                6: "I'm starving please feed me!",
                3: "I'm feeling very weak. Any food would help!",
                0: "I'm dead!!!",
                timeout: 3500,
                intervalId: undefined
            },
            "btn-water-plus": {
                numb: document.getElementById('thirst-out'),
                output: document.getElementById('message-out-thirst'),
                thanks: "Ah, refreshing! Thank you!",
                10: "I'm full",
                9: "I'm thirsty!",
                6: "I'm dehydrated, please give me water!",
                3: "I'm not going to make it I need water!!!",
                0: "I'm dead!!!",
                timeout: 2500,
                intervalId: undefined
            },
            "btn-pet-plus": {
                numb: document.getElementById('love-out'),
                output: document.getElementById('message-out-love'),
                thanks: "I love you! Prrrr!!!",
                9: "I need some love!",
                6: "I feel unloved, please pet me!",
                3: "I'm going to ignore you now!",
                0: "I'M DISOWNING YOU",
                timeout: 5500,
                intervalId: undefined
            },
        }

        // Get DOM nodes
        this.buttons = document.querySelectorAll('.game-controls button');
        this.images = document.querySelectorAll('.cat-images-container .cat-image-container img');
        this.nameCreator = document.querySelector('.cat-name-creator');
        this.nameForm = document.querySelectorAll('.cat-name-creator form input');
        this.gameBoardContainer = document.querySelector('.gameboard-container');
        this.gameImageOutput = document.querySelector('.game-image-output');
        this.playAgainButton = document.getElementById('btn-play-again');
        this.catSelector = document.querySelector('.cat-selector');

        // 'Global' event listeners (ones that can stay between plays)
        this.playAgainButton.addEventListener('mousedown', this.playAgain.bind(this));
        this.images.forEach(item => item.addEventListener('mousedown', this.choseCat.bind(this)));
        this.nameForm[1].addEventListener('mousedown', this.choseName.bind(this));
        /*
            Define a handler to hold reference to the this.click bounding to this value
            required for event listener removal later on (which is required because example
            does not show disabling buttons).
         */
        this.clickHandler = this.click.bind(this);
    }

    init() {
        this.show(this.catSelector);
    }

    playAgain() {
        // Reset function
        this.hide(this.playAgainButton);
        this.hide(this.gameBoardContainer);
        this.hide(this.gameImageOutput.lastElementChild);
        this.show(this.gameImageOutput.firstElementChild);
        for (const item in this.gameOutput) {
            let mytems = this.gameOutput[item];
            mytems.numb.innerText = '10';
        }
        this.nameForm[0].value = '';
        this.init();
    }

    choseCat(event) {
        this.hide(this.catSelector);
        this.show(this.nameCreator);
        this.gameImageOutput.firstElementChild.src = event.target.src;
    }
    choseName() {
        let val = this.nameForm[0];
        let value = val.value;
        this.gameBoardContainer.firstElementChild.firstElementChild.firstElementChild.innerText = this.name = value;
        val.value = '';
        this.hide(this.nameCreator);
        this.show(this.gameBoardContainer);
        this.runGame();
    }

    runGame() {
        this.buttons.forEach((item) =>
            item.addEventListener('mousedown', this.clickHandler)
        );


        // run hunger
        for (const item in this.gameOutput) {
            const mytems = this.gameOutput[item];
            const welt = () => {
                let l = parseInt(mytems.numb.innerText);
                this.decrement(l, mytems);
                this.updateText(mytems, l - 1);
            }
            // Set intervals (and track IDs for clearing)
            mytems.intervalId = setInterval(welt, mytems.timeout);
        }
    }

    click(event) {
        const mytems = this.gameOutput[event.target.id];
        this.increment(parseInt(mytems.numb.innerText), mytems);
    }

    show(item) {
        item.style.display = 'block';
    }
    hide(item) {
        item.style.display = 'none';
    }

    decrement(item, add) {

        /*

            add: object; this.gameOutput["btn-name"]
            item: int; 0-10
            add.numb: DOM element
            this.dead(): class method (from CatGame)

        */

        if (item - 1 === 0 && add !== this.gameOutput["btn-pet-plus"]) this.dead();
        let l = this.recursive(add, item);
        add.numb.innerText = `${item - 1}`;
        add.output.innerText = `${add[l]}`
    }
    increment(item, add) {

        /*

            add: object; this.gameOutput["btn-name"]
            item: int; 0-10
            add.output: DOM element
            add.numb: DOM element

            if (item is NOT equal to 10)
            Increment and thank the user
            OR
            Change output text of current output to current item value

        */
        let addOutput = add.output;
        let addThanks = add.thanks;
        if (item !== 10) {
            addOutput.innerText = `${addThanks}`;
            add.numb.innerText = `${item + 1}`;
        } else {
            addOutput.innerText = `${add[item]}`;
        }
    }

    // Find the heightened
    recursive(add, item) {
        if (this.gameOutput["btn-food-plus"][item] !== undefined) return item;
        return this.recursive(add, item + 1);
    }

    updateText(mytems, calc) {
        if (mytems[calc]) {
            mytems.output.innerText = mytems[calc];
        }
    }

    dead() {

        // Hide Cat image
        this.hide(this.gameImageOutput.firstElementChild);

        // Display Grim Reaper image
        this.show(this.gameImageOutput.lastElementChild);

        // Remove button event listeners (enacts functionality of increment and etc)
        this.buttons.forEach((item) =>
            item.removeEventListener('mousedown', this.clickHandler)
        );

        // Run clearInterval on saved IDs
        let l = this.gameOutput;
        for (const item in l) clearInterval(l[item].intervalId);

        // Show "Play Again" button.
        this.show(this.playAgainButton);

    }

}

new CatGame();