import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Fetcher from '../middleware/Fetcher.js';

import Poster from '../components/Poster.jsx';
import Results from '../components/Results.jsx';

export default function Search() {

    const { query } = useParams();
    const [results, setResults] = useState({});

    useEffect(() => {

        async function makeSearch(search) {

            const data = await Fetcher('https://api.themoviedb.org/3/search/movie?query=' + encodeURIComponent(search.trim()));
        
            if (data.results) {

                setResults(data.results);

            }

        }

        makeSearch(query);

    }, [query]);

  return <main className="flex flex-column items-center">
      <header className="flex flex-column">
        <h1>Search</h1>
        <h2>You asked for "{query}" and this is what we found!</h2>
      </header>
      <Results data={results} />
    </main>;
}