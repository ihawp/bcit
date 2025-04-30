import MovieDataContext from '../middleware/MovieDataContext.js';
import { useContext } from 'react';

export default function Favourites() {

	const { Popular, NowPlaying, TopRated, Upcoming } = useContext(MovieDataContext);
	const collections = { Popular, NowPlaying, TopRated, Upcoming };


	console.log(JSON.parse(localStorage.getItem('favourites')));

	return <>
		<h1>Favourites</h1>
	</>;
}