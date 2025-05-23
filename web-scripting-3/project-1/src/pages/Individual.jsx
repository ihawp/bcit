import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Fetcher from '../middleware/Fetcher';
import { FavouritesContext } from '../middleware/FavouritesData';
import FavouriteButton from '../components/FavouriteButton';

import '../styles/Individual.css'

export default function Individual() {

	// use params causes string which does not match for .includes
	let { id } = useParams();
	id = Number(id);

	const { isFavourite, addFavourite, removeFavourite } = useContext(FavouritesContext);

	const [favouriteState, setFavouriteState] = useState(isFavourite(id));

	const location = useLocation();
	const [data, setData] = useState({});

	const toggleFavourite = () => {
	  if (favouriteState) {
		setFavouriteState(false);
		Remove(id);
	  } else {
		setFavouriteState(true);
		Add(id);
	  }
	};

	const buttonStopProp = () => {
		toggleFavourite(id);
	}

	const useFetcher = async () => {

		let response = await Fetcher('https://api.themoviedb.org/3/movie/'+id);

		if (response) {
			setData(response);
		} else {
			setData([]);
		}

	}

	useEffect(() => {

		// Point of this is to either retrieve data
		// from the point-of-click (on the poster)
		// or query for the movie data based on the
		// id param (if the data from poc not set)
		if (location.state) {
			const { movie } = location.state;
			if (movie) setData(movie);
		} else {
			useFetcher();
		}

	}, []);

	const Add = (id) => addFavourite(id);
	const Remove = (id) => removeFavourite(id);

	return <main id="individual" className='flex flex-column items-center'>
		{data ? console.log(data) : console.log(data)}
		<header>
			<h1>{data.original_title}</h1>
		</header>
		<section>

			<img src={data.backdrop_path ? 'https://image.tmdb.org/t/p/w1280' + data.backdrop_path : 'default-path.webp'} loading="lazy" draggable="false" />

			<div className="">
				<h2>Overview</h2>
				<p>{data.overview}</p>
				<FavouriteButton buttonStopProp={toggleFavourite} svgState={favouriteState} />
			</div>
		</section>
	</main>;
}