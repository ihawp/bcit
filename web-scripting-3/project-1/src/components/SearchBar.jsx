import { useNavigate } from 'react-router-dom';

export default function SearchBar() {

    const navigate = useNavigate();

    const makeSearch = (event) => {
		event.preventDefault();

        let search = event.target[0].value;
        
        navigate('./search/'+search);

        event.target[0].value = '';

    }

    return <nav aria-label="Search Bar">
        <form onSubmit={makeSearch}>
            <input type="text" name="search-bar" id="search-bar" required></input>
            <input type="submit" value="Search"/>
        </form>
    </nav>;
}