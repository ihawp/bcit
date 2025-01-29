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
        this.current = 1;
        this.maxImages = 34;
        this.slide = document.getElementById('slide');
        this.init();
    }
    init() {
        /*

            Set 'click' event listeners for
            left/right buttons

        */
        document.getElementById('btn-turn-clockwise').addEventListener('click', this.click);
        document.getElementById('btn-turn-counter-clockwise').addEventListener('click', this.click);

    }
    /*

        Handle click event from turn
        left/right buttons

    */
    click = (event) => {
        /*

            Change count based on whether the
            left button or not

        */
        event.target.id === 'btn-turn-clockwise' ? this.current++ : this.current--;

        /*

            Check for 'bad increment/decrement'
            and change to correct value

        */
        if (this.current === 0) {
            this.current = this.maxImages;
        }
        if (this.current > this.maxImages) {
            this.current = 1;
        }

        /*

            Show the next slide

        */
        this.slide.src = 'images/bike-' + this.current + '.jpg';

    }



}

/*

    Create new instance of
    HorizontalCarousel class

*/
new HorizontalCarousel;
