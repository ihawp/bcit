import { BrowserRouter, Routes, Route } from 'react-router-dom';

import About from '../pages/About.jsx';
import Home from '../pages/Home.jsx';
import Favourites from '../pages/Favourites.jsx';
import Search from '../pages/Search.jsx';
import BigSearch from '../pages/BigSearch.jsx';
import Individual from '../pages/Individual.jsx';
import Errort from '../pages/Errort.jsx';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

import { FavouritesProvider } from '../middleware/FavouritesData.jsx';

import MovieDataProvider from '../middleware/MovieData.jsx';

export default function AppRouter() {
	return <BrowserRouter>

		<MovieDataProvider>
		<FavouritesProvider>

			<Header />

			<Routes>
				<Route path="/" element={ <Home/> } />
				<Route path="/about" element={ <About /> } />
				<Route path="/favourites" element={ <Favourites /> } />
				<Route path={"/search/:query"} element={ <Search /> } />
				<Route path={"/search"} element={ <BigSearch /> } />
				<Route path="/movie/:id" element={ <Individual /> } />
				<Route path="*" element={ <Errort /> } />
			</Routes>

			<Footer />

		</FavouritesProvider>
		</MovieDataProvider>

	</BrowserRouter>;
}
