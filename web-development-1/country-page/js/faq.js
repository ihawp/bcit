class FAQ {
    constructor(data) {
        this.faq = document.getElementById('faq');
        this.open = 0;
        this.data = data;
        this.init();
    }
    init() {
        this.data.map((item, index) => {
            let items = '';
            item.details.map(item => items += `<p class="pb-1">${item}</p>`);
            this.faq.insertAdjacentHTML('beforeend', `
                <li>
					<details id="details-${index}" class="flex-col">
						<summary class="px-1" id="summary-${index}">
						    <h3>${item.summary}</h3>
						</summary>
						${items}
					</details>
				</li>
			`);
            document.getElementById(`summary-${index}`).addEventListener('click', () => {
                    document.getElementById(`details-${this.open}`).removeAttribute("open");
                    this.open = index;
            });
        })
    }
}
