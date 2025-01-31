/*

    Warren Chemerika

    BCIT | Web Scripting 1

    Assignment 4

    -------------

    Some functional programming!

*/

const colourInput = document.querySelectorAll('input[name="shirt-color"]');
colourInput.forEach(function(item) {
    item.addEventListener('change', colour);
});

const sizeInput = document.querySelectorAll('input[name="shirt-size"]');
sizeInput.forEach(function(item) {
    item.addEventListener('change', size);
});

function colour(event) {
    serveImages(event.target.value);
    document.getElementById('selected-color-out').innerText = event.target.nextElementSibling.innerText;
}
function serveImages(value) {

    /* make the strings work */


    console.log(value);
}


function size(event) {
    document.getElementById('selected-size-out').innerText = event.target.nextElementSibling.lastElementChild.innerText;
}