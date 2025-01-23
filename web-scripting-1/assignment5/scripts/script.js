const images = document.querySelectorAll('.cat-image-container');

images.forEach((item, key) => {

    item.addEventListener('click', doThing);
    console.log({item});
});

function doThing(event) {
    console.log(event.target.src);
    // use src to reprint image into the "cat-name-creator"
    console.log(event);
}
