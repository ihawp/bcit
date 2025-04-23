import { useParams, BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';

function User() {

	const { id } = useParams();
	const navigate = useNavigate();

	const l = useEffect(() => {
		// query some user data

		// set document title
		document.title = id;
	}, [id]);

	const redirect404 = () => {
		navigate('/about');
	}

	return <>
		<h1 onError={redirect404}>User ID: {id}</h1>
	</>;
}

function Home() {
	return <>
		<h1>Home</h1>
	</>;
}

function About() {
	return <>
		<h1>About</h1>
	</>;
}

export default function AppRouter() {
	return <>

	<BrowserRouter>

		<header>
			<nav aria-label="">
				<ul>
					<li>
						<NavLink to="/">Home</NavLink>
					</li>
					<li>
						<NavLink to="/about">About</NavLink>
					</li>
					<li>
						<NavLink to="/user/43">User</NavLink>
					</li>
				</ul>
			</nav>
		</header>

		<Routes>
			<Route path="/" element={ <Home/> } />
			<Route path="/about" element={ <About /> } />
			<Route path="/user/:id" element={ <User /> } />
		</Routes>

		<footer></footer>

	</BrowserRouter>

	</>;
}
