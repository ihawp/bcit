import MovieDataContext from '../middleware/MovieDataContext.js';
import { useContext, useEffect, useState } from 'react';
import { FavouritesContext } from '../middleware/FavouritesData.jsx';
import Results from '../components/Results.jsx';

export default function Favourites() {
  const { Popular, NowPlaying, TopRated, Upcoming } = useContext(MovieDataContext);
  const collections = { Popular, NowPlaying, TopRated, Upcoming };

  const { favourites } = useContext(FavouritesContext);

  const [data, setData] = useState([]);

  const collectionsReady = Object.values(collections).every(
    (collection) => collection && Object.keys(collection).length > 0
  );

  const searchCollectionsForMovieData = (id, collections) => {
    for (const moviesObj of Object.values(collections)) {
      if (moviesObj && typeof moviesObj === 'object') {
        const movie = Object.values(moviesObj).find((movie) => movie.id === id);
        if (movie) return movie;
      }
    }
    return null;
  };

  useEffect(() => {
    if (!collectionsReady || favourites.length === 0) {
      setData([]);
      return;
    }

    const arr = favourites
      .map((favouriteId) => searchCollectionsForMovieData(favouriteId, collections))
      .filter(Boolean);

    setData(arr);
  }, [favourites, collectionsReady]);

  return <main className="flex flex-column items-center">
      <header>
        <h1>Favourites</h1>
      </header>
      <Results data={data} />
    </main>;
}