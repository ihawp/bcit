import APIKEY from '../../blah.js';

export default async function Fetcher(url) {

	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				'Authorization': APIKEY,
				'Content-Type': 'application/json'
			}
		});
	
		if (!response.ok) {
			throw new Error('Fetch Error');
		}
	
		const data = await response.json();
		return data;
	
	} catch (error) {
		throw new Error('Fetch Error: ' + error);
	}

}