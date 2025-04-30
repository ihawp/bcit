import { useContext } from 'react';

import MovieDataContext from '../middleware/MovieDataContext';
import Poster from '../components/Poster.jsx';

export default function Home() {

    const { Popular, NowPlaying, TopRated, Upcoming } = useContext(MovieDataContext);

    return <>

        <h1>Home</h1>

        <div className='movie-rows flex flex-column gap-1'>

            <MovieRow type={NowPlaying} title='Now Playing' />

            <MovieRow type={TopRated} title='Top Rated' />

            <MovieRow type={Popular} title='Popular' />

            <MovieRow type={Upcoming} title='Upcoming' />

        </div>

    </>;

}

function MovieRow({type, title}) {
    return <div className="movie-row">
        <h2>{title}</h2>
        <div className='flex flex-row gap-1'>
            {type ? Object.values(type).map((item, key) => <Poster item={item} key={key} /> ) : ''}
        </div>
    </div>
}