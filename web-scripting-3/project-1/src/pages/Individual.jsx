import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

const updateDocumentTitle = (content) => {
	const appTitle = 'React Movie DB';
    document.title = appTitle + ' - ' + content;
}

export default function Favourites() {
	const { id } = useParams();
	const location = useLocation();

	useEffect(() => {
		console.log(location.state);
		if (location.state) {
			console.log('this');
		} else {
			console.log('that');
		}
	}, [location]);

    useEffect(() => updateDocumentTitle('Individual Movie Page'), [])

	return <>
		<header>
			<h1>Individual Movie Page</h1>
		</header>
		<section>
			
		</section>
	</>;
}