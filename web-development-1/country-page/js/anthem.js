const audio = document.getElementById('canada-national-anthem');
const play = document.getElementById('cna-play');
const pause = document.getElementById('cna-pause');
play.addEventListener('click', () => audio.play());
pause.addEventListener('click', () => audio.pause());