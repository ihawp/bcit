document.getElementById("button-mobile-nav").addEventListener('click', open);
document.getElementById("button-exit-mobile-nav").addEventListener('click', close);

function open() {
    document.getElementById('button-exit-mobile-nav').removeAttribute('hidden');
    document.getElementById('button-mobile-nav').setAttribute('hidden', 'hidden');
    document.getElementById("navigation").classList.remove('display-sm');
}
function close() {
    document.getElementById('button-exit-mobile-nav').setAttribute('hidden', 'hidden');
    document.getElementById('button-mobile-nav').removeAttribute('hidden');
    document.getElementById("navigation").classList.add('display-sm');
}