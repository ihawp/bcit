
/*

    Define variables.

*/
const audio = document.getElementById('canada-national-anthem');
const play = document.getElementById('cna-play');
const pause = document.getElementById('cna-pause');
const restart = document.getElementById('cna-restart');
const timeline = document.getElementById('audio-timeline');
const audioStart = document.getElementById('audio-start');
const duration = Math.round(audio.duration);


/*

    Play the audio.

*/
play.addEventListener('click', () => {
    audio.play();
});

/*

    Pause the audio.

*/
pause.addEventListener('click', () => audio.pause());

/*

    Restart the audio.

*/
restart.addEventListener('click', () => {
    audio.currentTime = 0;
    audio.play();
});

/*

    When audio is playing update the time displayed
    on the screen to the user.

*/
audio.addEventListener('timeupdate', () => {
    if (parseInt(timeline.value) === Math.round(audio.duration)) {
        timeline.value = 0;
        audio.currentTime = 0;
        return audio.pause();
    }
    audioStart.innerText = formatDuration(audio.currentTime);
    timeline.value = audio.currentTime;
});

/*

    Enable ability to choose what point you are at
    in the song at any time without stopping of playing.

*/
timeline.addEventListener('change', () => {
    audio.currentTime = timeline.value;
});

/*

    Format the time (seconds) into minutes.

*/
function formatDuration(seconds) {
    const secs = Math.floor(seconds % 60);
    return `${Math.floor(seconds / 60)}:${secs < 10 ? '0' + secs : secs}`;
}