/*

    Warren Chemerika
    BCIT | Web Scripting 1
    Assignment 4

 */

const slides = document.querySelectorAll('.th');
slides.forEach((wow) => {
    wow.addEventListener('mouseover', () => {
        document.querySelector('.slide-container').innerHTML = wow.outerHTML;
    })
});

const colours = document.querySelectorAll('[name="shirt-color"]');
colours.forEach((wow) => {
    console.log(wow);
    wow.addEventListener('click', (event) => {
        slides.forEach((wow) => {
            console.log(wow);
        })
    })
})

