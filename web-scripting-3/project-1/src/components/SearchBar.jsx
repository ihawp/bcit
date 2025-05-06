import { useNavigate } from 'react-router-dom';
import '../styles/searchBar.css';
import { MagnifyingGlass } from './svg';

export default function SearchBar() {

    const navigate = useNavigate();

    const makeSearch = (event) => {
		event.preventDefault();

        let search = event.target[0].value;
        
        navigate('./search/'+search);

        event.target[0].value = '';

    }

    return <nav aria-label="Search Bar" id="search-bar-container">
        <form className="flex flex-row items-center" onSubmit={makeSearch}>
            <MagnifyingGlass />
            <input type="text" name="search-bar" id="search-bar" placeholder="Search Bar" required></input>
            <input type="submit" value="Search" />
        </form>
    </nav>;
}