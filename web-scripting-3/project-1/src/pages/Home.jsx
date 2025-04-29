import { useContext, useState } from 'react';

import MovieDataContext from '../middleware/MovieDataContext';
import Poster from '../components/Poster.jsx';

export default function Home() {

    const { Popular, NowPlaying, TopRated, Upcoming } = useContext(MovieDataContext);

    const [currentCat, setCurrentCat] = useState();

    return <>

        <h1>Home</h1>

        <div className='movie-rows flex flex-column gap-1'>

            <div className="movie-row">
                <h2>Now Playing</h2>
                <div className='flex flex-row gap-1'>
                    {NowPlaying.map((item, key) => <Poster item={item} key={key} /> )}
                </div>
            </div>

            <div className="movie-row">
                <h2>Top Rated</h2>
                <div className='flex flex-row gap-1'>
                    {TopRated.map((item, key) => <Poster item={item} key={key} /> )}
                </div>
            </div>

            <div className="movie-row">
                <h2>Popular</h2>
                <div className='flex flex-row gap-1'>
                    {Popular.map((item, key) => <Poster item={item} key={key} /> )}
                </div>
            </div>

            <div className="movie-row">
                <h2>Upcoming</h2>
                <div className='flex flex-row gap-1'>
                    {Upcoming.map((item, key) => <Poster item={item} key={key} /> )}
                </div>
            </div>
        </div>

    </>;

}