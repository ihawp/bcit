const images = document.querySelectorAll('.cat-image-container');

images.forEach((item, key) => {

    item.addEventListener('click', doThing);
    console.log({item});
});

function doThing(event) {
    console.log(event);
}
