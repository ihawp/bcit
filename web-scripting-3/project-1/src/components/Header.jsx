import SearchBar from './SearchBar.jsx';
import { NavLink } from 'react-router-dom';

export default function Header() {
    return <header>
        <nav aria-label="">
            <ul>
                <li>
                    <NavLink to="/" title="Home">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about" title="About">About</NavLink>
                </li>
                <li>
                    <NavLink to="/favourites" title="Favourites">Favourites</NavLink>
                </li>
            </ul>
        </nav>
        <SearchBar />
    </header>;
}