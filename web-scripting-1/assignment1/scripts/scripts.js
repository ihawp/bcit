/*
class Login {
    constructor() {
        this.init();
    }
    init() {
        document.getElementById('btn-log-in').addEventListener('click', this.login);
        document.getElementById('btn-log-out').addEventListener('click', this.logout);
    }
    login() {
        const l = prompt('Enter your name:');
        const output = document.getElementById('output');
        if (l) {
            const login = document.getElementById('btn-log-in');
            const logout = document.getElementById('btn-log-out');
            login.style.display = 'none';
            login.setAttribute('disabled', 'disabled');
            logout.style.display = 'block';
            logout.removeAttribute('disabled');
            return output.innerText = `Hello ${l}. Click the button below to log out.`;
        }
        return output.innerText = `You cancelled the log in. You are still logged out.`;
    }

    logout() {
        let l = confirm('Are you sure you want to log out?');
        const output = document.getElementById('output');
        if (l) {
            const login = document.getElementById('btn-log-in');
            const logout = document.getElementById('btn-log-out');
            logout.style.display = 'none';
            logout.setAttribute('disabled', 'disabled');
            login.style.display = 'block';
            login.removeAttribute('disabled');
            output.innerText = `You are now logged out. Click the login button to log in again.`;
        } else {
            output.innerText = `You cancelled the log out. You are still logged in.`;
        }
    }
}

new Login;
*/

function login() {
    const l = prompt('Enter your name:');
    const output = document.getElementById('output');
    if (l) {
        const login = document.getElementById('btn-log-in');
        const logout = document.getElementById('btn-log-out');
        login.style.display = 'none';
        login.setAttribute('disabled', 'disabled');
        logout.style.display = 'block';
        logout.removeAttribute('disabled');
        return output.innerText = `Hello ${l}. Click the button below to log out.`;
    }
    return output.innerText = `You cancelled the log in. You are still logged out.`;
}

function logout() {
    let l = confirm('Are you sure you want to log out?');
    const output = document.getElementById('output');
    if (l) {
        const login = document.getElementById('btn-log-in');
        const logout = document.getElementById('btn-log-out');
        logout.style.display = 'none';
        logout.setAttribute('disabled', 'disabled');
        login.style.display = 'block';
        login.removeAttribute('disabled');
        output.innerText = `You are now logged out. Click the login button to log in again.`;
    } else {
        output.innerText = `You cancelled the log out. You are still logged in.`;
    }
}

document.getElementById('btn-log-in').addEventListener('click', login);
document.getElementById('btn-log-out').addEventListener('click', logout);