import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Fetcher from '../middleware/Fetcher';

const updateDocumentTitle = (content) => {
	const appTitle = 'React Movie DB';
    document.title = appTitle + ' - ' + content;
}

export default function Favourites() {
	const { id } = useParams();
	const location = useLocation();

	const [data, setData] = useState({});

	useEffect(() => {
		if (location.state) {
			const { movie } = location.state;
			if (movie) setData(movie);
			console.log(movie);
		} else {
			const useFetcher = () => {
			
			}
		}

		const useFetcher = () => {

		}

	}, [location]);

    useEffect(() => updateDocumentTitle('Individual Movie Page'), [])

	return <>
		<header>
			<h1>Individual Movie Page</h1>
		</header>
		<section>

			<img src={data.backdrop_path ? 'https://image.tmdb.org/t/p/w1280' + data.backdrop_path : 'default-path.webp'} loading="lazy" draggable="false" />

			<div className="">
				<p>{data.original_title ? data.original_title : ''}</p>

			</div>
		</section>
	</>;
}