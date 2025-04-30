import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Poster({ item }) {
  const title = item['original_title'] + ' Movie Poster';

  const [includes, setIncludes] = useState(false);

  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    setIncludes(favourites.includes(item.id));
  }, [item.id]);

  const updateFavourites = (newList) => {
    localStorage.setItem('favourites', JSON.stringify(newList));
    setIncludes(newList.includes(item.id));
  };

  const addToFavourites = () => {
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    if (!favourites.includes(item.id)) {
      const updated = [...favourites, item.id];
      updateFavourites(updated);
    }
  };

  const removeFromFavourites = () => {
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    const updated = favourites.filter(id => id !== item.id);
    updateFavourites(updated);
  };

  if (!item.poster_path) return null;

  return (
    <div className="poster">
      <div className="flex flex-col">
        <img
          draggable="false"
          alt={title}
          title={title}
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        />

        <div className="content">
          <h2>{item.original_title}</h2>
          <p>{item.overview.slice(0, 150)}...</p>
          <p>Rating: {item.vote_average}</p>
          <Link to={`./i/${item.id}`}>More Info</Link>

          <button onClick={includes ? removeFromFavourites : addToFavourites}>
            {includes ? 'Remove from' : 'Add to'} Favourites
          </button>
        </div>
      </div>
    </div>
  );
}
