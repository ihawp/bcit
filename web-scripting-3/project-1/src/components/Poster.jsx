import { Link } from 'react-router-dom';

export default function Poster({item}) {

    const title = item['original_title'] + ' Movie Poster';

    const addToFavourites = () => {
        let arr = [];
        let q = JSON.parse(localStorage.getItem('favourites'));
        if (q.length > 0) arr = q;
        arr.push(item.id);
        localStorage.setItem('favourites', JSON.stringify(arr));
    }

    if (item.poster_path) {
        console.log(item);
        return <div className='poster'>

            <div className='flex flex-col'>

                <img draggable="false" alt={title} title={title} src={'https://image.tmdb.org/t/p/w500' + item.poster_path} />

                <div className='content'>
                    <h2>{item.original_title}</h2>

                    <p>{item.overview.slice(0, 150)}...</p>

                    <p>Rating: {item.vote_average}</p>

                    <Link to={'./i/' + item.id}>More Info</Link>

                    <button onClick={addToFavourites}>Add to Favourites</button>
                </div>


            </div>
        
        </div>
    }

}