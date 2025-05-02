import { useContext } from 'react';

import MovieDataContext from '../middleware/MovieDataContext';
import MovieRow from '../components/MovieRow.jsx';

export default function Home() {

    const { Popular, NowPlaying, TopRated, Upcoming } = useContext(MovieDataContext);

    return <main>

        <header>
            <h1>Home</h1>
        </header>

        <div className='movie-rows flex flex-column gap-1'>

            <MovieRow type={NowPlaying} title='Now Playing' />

            <MovieRow type={TopRated} title='Top Rated' />

            <MovieRow type={Popular} title='Popular' />

            <MovieRow type={Upcoming} title='Upcoming' />

        </div>

    </main>;

}