import { makeFetch, monthIntToString } from './functions.js';

export async function LeaderboardFetch() {
    let q = await makeFetch('http://localhost/project1/php/fetchLeaderboard.php');
    if (q) return q;
}

export default function Leaderboard() {

    this.display = (main, data) => {

        let string = `
            <section id="overflow">
                <ul class="leaderboard">
        `;
        
        data.forEach((item, key) => {

            switch (key) {
                case (0):
                    string += '<li class="leaderboard first">';
                    break;
                case (1):
                    string += '<li class="leaderboard second">';
                    break;
                case (2):
                    string += '<li class="leaderboard third">';
                    break;
                default:
                    string += '<li class="leaderboard">';
                    break;
            }

            let date = new Date(item.timestamp);
            let minutes = date.getMinutes();
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            let hours = date.getHours();
            let amPM = 'AM';
            if (hours > 12) {
                hours -= 12;
                amPM = 'PM';
            }

            string += `
                    <div class="absolute"><span class="smaller">#</span>${key + 1}</div>
                    <p>${item.username}</p>
                    <p>Enemies Defeated: ${item['enemies_defeated']}</p>
                    <p>Round Lost: ${item['round_lost']}</p>
                    <p>${monthIntToString(date.getMonth())} ${date.getDate()}, ${date.getFullYear()} ${hours}:${minutes} ${amPM}</p>
                </li>
            `
        });
        main.innerHTML = string;
    }
}

// Could make leaderboard fetch data from leaderboard.php so that it is single page application (or maybe my ihawp.com/api link)