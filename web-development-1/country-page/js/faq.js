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
					<details id="details-${index}" class="flex flex-col px-1">
						<summary>
						    <h3>${item.summary}</h3>
						</summary>
						<div class="mt-half">
						    <p>${item.details}</p>						
                        </div>
					</details>
				</li>
				`);
            document.getElementById(`details-${index}`).addEventListener('click', () => {
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
