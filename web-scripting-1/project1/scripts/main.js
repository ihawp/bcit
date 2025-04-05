// ihawp.com Canvas API Game

import Game from './game.js';
import ParticleBackground from './particle.js';
import Fullscreen from './fullscreen.js';
import Leaderboard, { LeaderboardFetch } from './leaderboard.js';
import Error from './error.js';

function Main() {

    this.actual = window.location.pathname.split('/');
    this.actual = this.actual[this.actual.length - 1];
    
    this.state = 'play';
    if (this.state !== this.actual && this.actual.length > 0) {
        this.state = this.actual;
    }

    this.game = new Game();
    this.game.init();

    this.particleBackground = new ParticleBackground().init();

    this.leaderboard = new Leaderboard();

    this.fullscreen = new Fullscreen;

    this.error = new Error;

    this.main = document.getElementById('main');

    this.navigation = document.getElementById('navigation');

    this.svg = {
        leaderboard: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M160 80c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 352c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-352zM0 272c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 160c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48L0 272zM368 96l32 0c26.5 0 48 21.5 48 48l0 288c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48z"/></svg>',
        play: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>'
    }

    this.updateState = (state) => {
        this.state = state;
        this.displayState();
    }

    this.pushState = function(urlTitle) {
        history.pushState('', '', urlTitle);
    }

    this.updateNavigation = function(url) {
        this.navigation.innerHTML = this.svg[url];
        this.navigation.href = './' + url;
    }

    this.displayState = async () => {
        this.main.innerHTML = '';
        switch (this.state) {
            case ('play'):
                this.updateNavigation('leaderboard');
                this.game.display(this.main);
                break;
            case ('leaderboard'):
                this.game.pause();
                this.updateNavigation('play');
                let data = await LeaderboardFetch();
                if (data) {
                    this.leaderboard.display(this.main, data);
                } else {
                    this.error.display(this.main);
                }
                break;
            default:
                this.error.display(this.main);
                break;
        }
        this.pushState(this.state);
    }

    this.displayState();

    this.func = (event) => {
        event.preventDefault();
        let q = this.navigation.href.split('/');
        this.updateState(q[q.length - 1]);
    }

    this.navigation.addEventListener('click', this.func);
}

new Main();