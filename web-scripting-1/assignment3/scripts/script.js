/*

    Warren Chemerika
    BCIT | Web Scripting 1
    Assignment 3

    Apologies for my lack of commenting on the
    first two assignments.

    -------------

    HorizontalCarousel: Move through a slide
    of images in either direction infinitely

*/
class HorizontalCarousel {
    /*

        Use query selector all to store reference
        to all objects inside .slide

        Set current slide count

        Initialize the class functionality
        by adding event listeners to both
        buttons

    */
    constructor() {
        this.count = document.querySelectorAll('.slide img');
        this.current = 0;
        this.init();
    }
    init() {
        /*

            Set 'click' event listeners for
            left/right buttons

        */
        document.getElementById('btn-turn-clockwise').addEventListener('click', this.click.bind(this));
        document.getElementById('btn-turn-counter-clockwise').addEventListener('click', this.click.bind(this));

        /*

            Set display 'none'

        */
        this.count.forEach((item, keys) => {
           return keys !== 0 ? item.style.display = 'none' : 0;
        });
    }

    /*

        display 'none' for current slide

    */
    removeCurrent() {
        this.count[this.current].style.display = 'none';
    }

    /*

        display 'block' for current slide

    */
    showCurrent() {
        this.count[this.current].style.display = 'block';
    }

    /*

        Handle click event from turn
        left/right buttons

    */
    click(event) {
        /*

            Remove current slide

        */
        this.removeCurrent();

        /*

            Change count based on whether the
            left button or not

        */
        event.target.id === 'btn-turn-clockwise' ? this.current -= 1 : this.current += 1;

        /*

            Check for 'bad increment/decrement'
            and change to correct value

        */
        if (this.current === -1) {
            this.current = this.count.length - 1;
        }
        if (this.current >= this.count.length) {
            this.current = 0
        }

        /*

            Show the next slide

        */
        this.showCurrent();
    }
}

/*

    Create new instance of
    HorizontalCarousel class

*/
new HorizontalCarousel;
