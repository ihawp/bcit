import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FavouritesContext } from '../middleware/FavouritesData.jsx';
import '../styles/posters.css';
import FavouriteButton from './FavouriteButton.jsx';

export default function Poster({ item }) {
  const title = item['original_title'] + ' Movie Poster';

  const { addFavourite, removeFavourite, isFavourite } = useContext(FavouritesContext);

  const [svgState, setSVGState] = useState(isFavourite(item.id));

  const toggleFavourite = () => {
    if (svgState) {
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
    navigate(`/movie/${item.id}`, { state: {movie: item} });
  }

  return <div>
    <div className="poster">
      <div className="flex flex-col">
        <img
          draggable="false"
          alt={title}
          title={title}
          src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '/default-path.webp'}
          loading="lazy"
        />

        <div className="content" onClick={clickNavigate}>
          <h2>{item.original_title}</h2>
          <p>{item.release_date}</p>
          <div className='flex flex-row justify-between'>
            <p>{item.vote_average.toFixed(1)} / 10</p>
            <FavouriteButton buttonStopProp={buttonStopProp} svgState={svgState} />
          </div>
        </div>
      </div>
    </div>
  </div>;
}
