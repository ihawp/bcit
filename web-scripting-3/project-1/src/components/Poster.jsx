import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FavouritesContext } from '../middleware/FavouritesData.jsx';
import { EmptyHeart, FullHeart } from './svg.jsx';

export default function Poster({ item }) {
  const title = item['original_title'] + ' Movie Poster';

  const { addFavourite, removeFavourite, isFavourite } = useContext(FavouritesContext);

  const [svgState, setSVGState] = useState(isFavourite(item.id));

  const toggleFavourite = () => {
    if (isFavourite(item.id)) {
      setSVGState(false);
      removeFavourite(item.id);
    } else {
      setSVGState(true);
      addFavourite(item.id);
    }
  };

  const buttonStopProp = (event) => {
    event.stopPropagation();
    toggleFavourite();
  }

  const navigate = useNavigate();

  const clickNavigate = (event) => {
    event.preventDefault();
    localStorage.setItem('individual', item);
    navigate(`/movie/${item.id}`, { state: {movie: item} });
  }

  return <div onClick={clickNavigate}>
    <div className="poster">
      <div className="flex flex-col">
        <img
          draggable="false"
          alt={title}
          title={title}
          src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '/default-path.webp'}
          loading="lazy"
        />

        <div className="content">
          <h2>{item.original_title ? item.original_title : ''}</h2>
          <p>{item.overview ? item.overview.slice(0, 150) + '...' : 'Error'}</p>
          <p>{item.vote_average > 0 ? item.vote_average.toFixed(0) : ''}</p>
          <button onClick={buttonStopProp}>
            {svgState ? <FullHeart /> : <EmptyHeart /> }
          </button>
        </div>
      </div>
    </div>
  </div>;
}
