
// insert hero image
document.getElementById("hero-image").src = `media/bg${window.innerWidth < 580 ? '-mobile' : ''}.webp`;

class MobileNav {
    constructor() {
        this.init();
    }
    init() {
        document.getElementById("button-mobile-nav").addEventListener('click', this.open);
        document.getElementById("button-exit-mobile-nav").addEventListener('click', this.close)
    }
    open() {
        document.querySelector('footer').style.display = 'none';
        document.querySelector('main').style.display = 'none';
        return document.getElementById("mobile-nav").style.display = 'flex';
    }
    close() {
        document.querySelector('footer').style.display = 'flex';
        document.querySelector('main').style.display = 'flex';
        return document.getElementById("mobile-nav").style.display = 'none';
    }
}

new MobileNav;
