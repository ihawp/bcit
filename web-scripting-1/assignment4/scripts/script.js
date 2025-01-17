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
        this.slides.forEach((wow) => {
           wow.addEventListener('mouseover', () => {
               console.log(wow);
               document.querySelector('.slide-container').innerHTML = wow.toString();
           })
        });
        console.log(this.slides);
    }

}

new DoIt;