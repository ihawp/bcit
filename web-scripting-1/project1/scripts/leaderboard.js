import { makeFetch, monthIntToString, convertIntToRoman } from './functions.js';

export async function LeaderboardFetch() {
    let q = await makeFetch('http://localhost/project1/php/fetchLeaderboard.php');
    if (q) return q;
}

export default function Leaderboard() {

    this.display = (main, data) => {

        let string = `
            <section id="leaderboard-container">
                <ul class="leaderboard">
                    <li class="leaderboard guide font-0-8">
                        <p class="rank">Rank</p>
                        <p class="username">Username</p>
                        <p class="enemies">Enemies Defeated</p>
                        <p class="round">Round Lost</p>
                    </li>
        `;
        
        data.forEach((item, key) => {

            switch (key) {
                case (0):
                    string += '<li class="leaderboard first ';
                    break;
                case (1):
                    string += '<li class="leaderboard second ';
                    break;
                case (2):
                    string += '<li class="leaderboard third ';
                    break;
                default:
                    string += '<li class="leaderboard ';
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

            string += `font-0-8" title="${monthIntToString(date.getMonth())} ${date.getDate()}, ${date.getFullYear()} ${hours}:${minutes} ${amPM}">`;

            string += `
                    <p class="rank">#${key + 1}</p>
                    <p class="username font-0-8">${item.username}</p>
                    <p class="enemies">${item['enemies_defeated']}</p>
                    <p class="round">${convertIntToRoman(item['round_lost'])}</p>
                </li>
            `
        });
        main.innerHTML = string;
    }
}

// Could make leaderboard fetch data from leaderboard.php so that it is single page application (or maybe my ihawp.com/api link)