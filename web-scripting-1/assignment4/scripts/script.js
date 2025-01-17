/*

    Warren Chemerika
    BCIT | Web Scripting 1
    Assignment 4

 */

const images = {
    black: {
        0: 't-shirt-black-back.jpg',
        1: 't-shirt-black-front.jpg',
        2: 't-shirt-black-no-model.jpg'
    },
    red: {
        0: 't-shirt-red-back.jpg',
        1: 't-shirt-red-front.jpg',
        2: 't-shirt-red-no-model.jpg'
    },
    grey: {
        0: 't-shirt-grey-back.jpg',
        1: 't-shirt-grey-front.jpg',
        2: 't-shirt-grey-no-model.jpg'
    },
}

const slides = document.querySelectorAll('.th');
slides.forEach((wow) => {
    wow.addEventListener('mouseover', () => {
        document.querySelector('.slide-container').innerHTML = wow.outerHTML;
    })
});

const colours = document.querySelectorAll('[name="shirt-color"]');
colours.forEach((wow) => {
    wow.addEventListener('click', (event) => {
        let counter = undefined;
        let l = slides[1].childNodes[1].childNodes[1];
        let wow = l.src;
        switch (wow.value) {
            case ('black'):
                counter = 0;
                break;
            case ('red'):
                counter = 1;
                break;
            case ('grey'):
                counter = 2;
                break;
        }

        let p = wow.split('/');
        l.src = 'images/' + p[p.length - 1];

        console.log(l, wow, p, 'images/' + p[p.length - 1]);

    })
})

