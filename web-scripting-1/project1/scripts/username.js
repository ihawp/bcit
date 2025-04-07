export default function Username(sendAlert) {

    this.sendAlert = sendAlert;
    this.name = 'Anonymous';

    if (localStorage.getItem('username')) {
        this.name = localStorage.getItem('username');
    }

    this.form = undefined;
    this.timeoutId = undefined;
    this.regex = new RegExp("^[A-Za-z]+$");

    this.display = function(main) {

        main.innerHTML = `
            <section id="usernameForm" class="gap-0-5 flex">
                <form id="username-form" class="flex col gap-0-5">
                    <div class="flex row justify-between">
                        <label for="username-input" class="font-0-8">Change Username:</label>
                    </div>
                    <div>
                        <input class="b-1-2 c-2 boldonse" type="text" id="username-input" pattern="^[A-Za-z]+$" value="" placeholder="${this.name}" name="username" minlength="1" maxlength="16" required>
                        <button class="b-1-2 c-1 bg-2 boldonse" type="submit">Update</button>
                    </div>
                </form>
            </section>
        `;
        
        this.form = document.getElementById('username-form');
        this.currentName = document.getElementById('username-current');
    
        this.form.addEventListener('submit', (event) => {
    
            event.preventDefault();
    
            let data = new FormData(this.form);
            let name = data.get('username');
    
            if (name.length > 0 && name.length < 17 && this.regex.test(name)) {
    
                localStorage.setItem('username', name);
                
                let input = this.form[0];
                input.value = '';
                this.name = input.placeholder = name;
    
                this.sendAlert('green', 'Success!');
    
            } else {
    
                this.sendAlert('red', 'Error.');
    
            }
    
        });
    
    }

}