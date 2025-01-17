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
        this.init();
    }
    init() {
        /*

            Set 'click' event listeners for
            left/right buttons

        */
        document.querySelector('.slide').addEventListener('mousedown', () => {
            document.addEventListener('mousemove', (event) => {
                console.log(event.screenX);
            });
            this.click();
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
    removeCurrent = () => {
        this.count[this.current].style.display = 'none';
    }

    /*

        Display 'block' for current slide

    */
    showCurrent = () => {
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
    click = (event) => {

        /*

            Variable interval initialized to
            value of setInterval of spinning
            every 50ms it changes image!

        */
        let interval = setInterval(() => {

            console.log(event.screenX);

            /*

                Remove current slide

            */
            this.removeCurrent();

            /*

                Change count based on whether the
                left button or not

            */
            event.target.id === 'slide' ? this.current -= 1 : this.current += 1;

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

        }, 50);
        clearInterval(interval);

        /*

            Set event listener on event target,
            using options (once: true) we can
            garbage collect our event listener!
            https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

            Clear the interval set above


        document.querySelector('.slide').addEventListener('mouseup', () => {
            clearInterval(interval);
        }, { once: true });
        */
    }

}

/*

    Create new instance of
    HorizontalCarousel class

*/
new HorizontalCarousel;
