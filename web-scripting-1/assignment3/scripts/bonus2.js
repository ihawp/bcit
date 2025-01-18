/*

    Warren Chemerika
    BCIT | Web Scripting 1
    Assignment 3

    Apologies for my lack of commenting on the
    first two assignments.

    Original code copied from my bonus1.js

    -------------

    NOTE:

    I was never sure if we were meant to
    load the bike slides dynamically...

    The bonus2.js does not work on mobile
    view in Inspect Element. I am assuming there
    are some functions that are better suited for
    interactivity in that way..? Is it meant to work
    on mobile?

    -------------

    HorizontalCarousel: Move through a slide
    of images in either direction infinitely
    while holding down and moving left/right

*/
class HorizontalCarousel {
    /*

        Use query selector all to store reference
        to all objects inside .slide

        Set current slide count

        Initialize this.last for storage of information!

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

            Set mouse down, up event listeners for
            '.slide'

            Remove event listener for '.slide' for
            changing slides (to stop changing slides)

        */
        const slide = document.querySelector('.slide');
        slide.addEventListener('mousedown', () => {
            slide.addEventListener('mousemove', this.changeSlide);
        });

        /*

            Use of document removes glitch (from using slide.)
            where mousedown and leaving the slide
            div and then mouseup and re-entering the slide still
            enacting spinning of the bike... sorry about a third
            upload of these files...

         */
        document.addEventListener('mouseup', () =>
            slide.removeEventListener('mousemove', this.changeSlide)
        );

        /*

            Set display 'none' on all slides except for
            the first slide

        */
        this.count.forEach((item, keys) =>
            keys !== 0 ? item.style.display = 'none' : 0
        );
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

        Handle mouseover event from
        '.slide'

    */
    changeSlide = (event) => {
        /*

            Remove current slide

        */
        this.removeCurrent();

        /*

            This.last tracks the last event.screenX
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
