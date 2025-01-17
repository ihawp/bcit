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
        let l = slides[0].childNodes[1].childNodes[1];
        console.log(event);
        let wow = l.src;

        let p = wow.split('/');
        console.log('wow', p);
        console.log(p.length);
        console.log(p[p.length]);
        console.log({l});
        switch (wow.value) {
            case ('black'):

                break;
            case ('red'):
                break;
            case ('grey'):

                break;
        }

        l.src = images.black[0].slice(-1, '/');

    })
})

