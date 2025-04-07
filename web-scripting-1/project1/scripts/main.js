// ihawp.com Canvas API Game

import Game from './game.js';
import ParticleBackground from './particle.js';
import Fullscreen from './fullscreen.js';
import Leaderboard, { LeaderboardFetch } from './leaderboard.js';
import Error from './error.js';
import Username from './username.js';
import Alert from './alert.js';

function Main() {

    this.actual = window.location.pathname.split('/');
    this.actual = this.actual[this.actual.length - 1];
    
    this.state = 'play';
    if (this.state !== this.actual && this.actual.length > 0) {
        this.state = this.actual;
    }

    this.game = new Game();

    this.particleBackground = new ParticleBackground().init();

    this.leaderboard = new Leaderboard();

    this.fullscreen = new Fullscreen;

    this.error = new Error;

    this.alert = new Alert();

    this.username = new Username(this.alert.sendAlert);

    this.main = document.getElementById('main');

    this.navigation = document.getElementById('navigation');

    this.updateState = (state) => {
        if (this.state === state) return;
        this.state = state;
        this.displayState();
    }

    this.pushState = function(urlTitle) {
        history.pushState('', '', urlTitle);
    }

    this.displayState = async () => {
        this.main.innerHTML = '';

        // error.js get rid of this logic
        if (this.navigation.classList.contains('none')) {
            this.navigation.classList.remove('none');
        }

        if (this.state !== 'play') {
            this.game.pause();
        }

        switch (this.state) {
            case ('play'):
                if (!this.game.initiated) {
                    this.game.init();
                    this.game.setInitiated(true);
                }
                this.game.display(this.main, this.username.name);
                break;

            case ('leaderboard'):
                let data = await LeaderboardFetch();
                if (data) {
                    this.leaderboard.display(this.main, data);
                } else {
                    this.error.display(this.main);
                }
                break;

            case ('username'):

                // So that w a s d can be entered (I could also remove this logic and not prevent default with the keydown and keyup listeners... more buttons could be used eventually so it's not unreasonable to leave the functions in place (as someone might want to ctrl+w out of the tab ))
                if (this.game.initiated) {
                    this.game.player.removeKeyDown();
                    this.game.player.removeKeyUp();
                }
                this.username.display(this.main);
                break;

            default:
                this.error.display(this.main, this.navigation);
                break;
        }
        this.pushState(this.state);
    }

    this.displayState();

    this.leta = document.querySelectorAll('a');
    this.leta.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            let q = item.href.split('/');
            this.updateState(q[q.length - 1]);
        });
    });
}

new Main();