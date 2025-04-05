export default function Username() {
    this.name = 'Anonymous';
    if (localStorage.getItem('username')) {
        this.name = localStorage.getItem('username');
    }
    this.form = undefined;
    this.timeoutId = undefined;
    this.regex = new RegExp("^[A-Za-z]+$");

    this.alert = document.createElement('div');
    this.alert.style.width = 'max-content';
    this.alert.style.height = 'max-content';
    this.alert.innerText = 'success';

    this.display = function(main) {
        main.innerHTML = `
            <section id="usernameForm" class="gap-0-5">
                <form id="username-form" class="flex col gap-0-5">
                    <div class="flex row justify-between">
                        <label for="username-input">Change Username:</label>
                    </div>
                    <div>
                        <input type="text" id="username-input" pattern="^[A-Za-z]+$" value="" placeholder="${this.name}" name="username" minlength="1" maxlength="16" required>
                        <button type="submit">Update</button>
                    </div>
                </form>
            </section>
        `;
        
        this.form = document.getElementById('username-form');
        this.currentName = document.getElementById('username-current');

        this.form.addEventListener('submit', event => {
            event.preventDefault();
            let data = new FormData(this.form);
            let name = data.get('username');
            if (name.length > 0 && name.length < 17 && this.regex.test(name)) {

                localStorage.setItem('username', name);

                let input = this.form[0];
                input.value = '';
                this.name = input.placeholder = name;
            }
        });
    }
}