export default function Error() {
    this.display = function(main) {
        document.querySelector('header').style.display = 'none';
        main.innerHTML = `
            <header>
                <h1 class="text-center">Error 404: Page does not exist.</h1>
            </header>
            <section class="text-center">
                <a class="go-home" href="./play">Go Home</a>
            </section>
        `;
    }
}