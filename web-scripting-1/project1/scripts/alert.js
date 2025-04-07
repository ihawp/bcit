export default function Alert() {

    this.alert = document.getElementById('alert-container');

    this.createAlert = function(color, message) {
        let alert = document.createElement('div');
        alert.classList.add('alert');
        alert.style.backgroundColor = color;
        alert.innerText = message;
        return alert;
    }

    this.sendAlert = (color, message) => {

        let alert = this.createAlert(color, message);
        this.alert.insertAdjacentElement('beforeend', alert);
        setTimeout(() => alert.remove(), 2000);

    }

}