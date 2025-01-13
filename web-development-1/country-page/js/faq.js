class FAQ {
    constructor(data) {
        this.open = 0;
        this.data = data;
        this.init();
    }
    init() {
        const faq = document.getElementById('faq');
        this.data.map((item, index) => {
            faq.insertAdjacentHTML('beforeend', `
                <li>
					<details id="details-${index}" class="flex flex-col">
						<summary class="px-1" id="summary-${index}">
						    <h3>${item.summary}</h3>
						</summary>
						<p class="pb-1">${item.details}</p>	
					</details>
				</li>
				`);
                document.getElementById(`summary-${index}`).addEventListener('click', () => {
                try {
                    document.getElementById(`details-${this.open}`).removeAttribute("open");
                }
                finally {
                    this.open = index;
                }
            });
        })
    }
}
