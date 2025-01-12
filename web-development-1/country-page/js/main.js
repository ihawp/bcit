class MobileNav {
    constructor() {
        this.init();
    }
    init() {
        document.getElementById("button-mobile-nav").addEventListener('click', this.open);
        document.getElementById("button-exit-mobile-nav").addEventListener('click', this.close)
    }
    open() {
        return document.getElementById("mobile-nav").style.display = 'flex';
    }
    close() {
        return document.getElementById("mobile-nav").style.display = 'none';
    }
}

new MobileNav;