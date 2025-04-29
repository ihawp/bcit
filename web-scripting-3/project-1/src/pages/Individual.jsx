import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const updateDocumentTitle = (content) => {
	const appTitle = 'React Movie DB';
    document.title = appTitle + ' - ' + content;
}

export default function Favourites() {
	const { id } = useParams();
	const navigate = useNavigate();

    useEffect(() => updateDocumentTitle('Individual Movie Page'), [])

	const redirect404 = () => {
		navigate('/about');
	}

	return <>
		<h1 onError={redirect404}>Movie ID: {id}</h1>
	</>;
}