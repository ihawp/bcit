// add X amount of details/summary to DOM
// click on one to open, if other was open, it will close
// https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute

class FAQ {
    constructor() {
        this.open = 0;
        this.data = [
            {
                summary: 'When will my order be ready?',
                details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat, est in elementum molestie, ex enim eleifend lectus, in porta ex odio vitae libero. Maecenas sit amet elit ut quam suscipit pulvinar. Pellentesque congue imperdiet augue ut laoreet. Mauris imperdiet lacinia erat at luctus.'
            },
            {
                summary: 'What are your store hours?',
                details: 'Vestibulum vel sapien sed est aliquam aliquam nec a felis. Nulla tempor ultrices mi ac congue. Morbi sed eros dignissim, sagittis sapien ac, finibus turpis. Curabitur condimentum, urna sit amet mattis faucibus, sem leo viverra orci, ac scelerisque nibh justo at magna.'
            },
            {
                summary: 'Can I return the product?',
                details: 'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris congue, risus congue porttitor dignissim, arcu purus imperdiet massa, sit amet convallis lorem leo sit amet lorem. Cras volutpat lobortis orci, quis efficitur augue fermentum nec. Vivamus non cursus magna.'
            }
        ];
        this.init();
    }

    init() {
        const faq = document.getElementById('faq');
        this.data.map((item, index) => {
            faq.insertAdjacentHTML('beforeend', `
					<details id="details-${index}"> <!-- this.open === index ? 'open' : '' -->
						<summary>
						${item.summary}
						</summary>
						${item.details}
					</details>
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
new FAQ;