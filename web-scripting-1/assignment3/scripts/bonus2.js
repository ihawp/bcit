/*

    Warren Chemerika
    BCIT | Web Scripting 1
    Assignment 3

    Apologies for my lack of commenting on the
    first two assignments.

    Original code copied from my bonus1.js

    -------------

    HorizontalCarousel: Move through a slide
    of images in either direction infinitely
    while holding down the buttons

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
        this.last = 0;
        this.init();
    }
    init() {
        /*

            Set 'click' event listeners for
            left/right buttons

        */
        const slide = document.querySelector('.slide');
        slide.addEventListener('mousedown', () => {
            slide.addEventListener('mousemove', this.changeSlide);
        });
        slide.addEventListener('mouseup', () => {
            slide.removeEventListener('mousemove', this.changeSlide);
        });

        /*

            Set display 'none' on all slides except for
            the first slide

        */
        this.count.forEach((item, keys) => {
            return keys !== 0 ? item.style.display = 'none' : 0;
        });
    }

    /*

        Display 'none' for current slide

    */
    removeCurrent() {
        this.count[this.current].style.display = 'none';
    }

    /*

        Display 'block' for current slide

    */
    showCurrent() {
        this.count[this.current].style.display = 'block';
    }

    /*

        Handle click event from turn
        left/right buttons

        Using arrow function to retain 'this' value.
        Realized the .bind(this) is redundant if arrow
        function used because it keeps same this state
        unlike class function initializer. Great, my
        understanding has clicked a bit!

    */
    changeSlide = (event) => {
        /*

            Remove current slide

        */
        this.removeCurrent();

        /*

            this.last tracks the last event.screenX
            so if event.screenX has changed then the
            image/position should as well

        */
        this.last < event.screenX ? this.current -= 1 : this.current += 1;
        this.last = event.screenX;

        /*

            Check for 'bad increment/decrement'
            and change to correct value

        */
        if (this.current === -1) {
            this.current = this.count.length - 1;
        }
        if (this.current >= this.count.length) {
            this.current = 0;
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
