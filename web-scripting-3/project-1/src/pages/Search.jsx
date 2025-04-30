import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Fetcher from '../middleware/Fetcher.js';

import Poster from '../components/Poster.jsx';

export default function Search() {

    const { query } = useParams();
    const [results, setResults] = useState({});

    useEffect(() => {

        async function makeSearch(search) {

            const data = await Fetcher('https://api.themoviedb.org/3/search/movie?query=' + encodeURIComponent(search.trim()));
        
            console.log(data);

            if (data.results) {

                console.log(data);

                setResults(data.results);

            }

        }

        makeSearch(query);

    }, [query]);

    return <>
        <h2>You searched for: {query}</h2>
        <h3>Here's what we've got!</h3>
        <div className='flex flex-row flex-wrap gap-1'>
            {results.length > 0 ? results.map((item, key) => <Poster item={item} key={key} />) : 'No Results!'}
        </div>
    </>
}