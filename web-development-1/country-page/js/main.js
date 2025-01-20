class MobileNav {
    constructor() {
        this.init();
    }
    init() {
        document.getElementById("button-mobile-nav").addEventListener('click', this.open);
        document.getElementById("button-exit-mobile-nav").addEventListener('click', this.close);
    }
    open() {
        document.getElementById('button-exit-mobile-nav').removeAttribute('hidden');
        document.getElementById('button-mobile-nav').setAttribute('hidden', 'hidden');
        document.getElementById("navigation").classList.remove('display-sm');
    }
    close() {
        document.getElementById('button-exit-mobile-nav').setAttribute('hidden', 'hidden');
        document.getElementById('button-mobile-nav').removeAttribute('hidden');
        document.getElementById("navigation").classList.add('display-sm');
    }
}

new MobileNav;
