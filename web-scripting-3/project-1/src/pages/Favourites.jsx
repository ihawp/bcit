export default function Favourites() {
	


	const l = JSON.parse(localStorage.getItem('favourites'));
	// not sure whether I use a useEffect here?
	if (l.length > 0) {
		console.log('has favourites');
	} else {
		console.log('does not have any favourites');
	}


	return <>
		<h1>Favourites Page</h1>
	</>;
}