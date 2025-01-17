/*

    Warren Chemerika
    BCIT | Web Scripting 1
    Assignment 4

 */

class DoIt {
    constructor() {
        this.slides = document.querySelectorAll('.slide-thumbnails-container div');
        this.init();
    }

    init() {
        console.log(this.slides);
    }

}

new DoIt;