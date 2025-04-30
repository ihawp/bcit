import { useState, useEffect } from 'react';
import MovieDataContext from './MovieDataContext.js';
import Fetcher from './Fetcher.js';

const MovieDataProvider = ({ children }) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const reducer = (type) => {
    return type.results.reduce((acc, movie) => {
      acc[movie.id] = movie;
      return acc;
    }, {});
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popular = await Fetcher('https://api.themoviedb.org/3/movie/popular');
        setPopularMovies(reducer(popular));

        const topRated = await Fetcher('https://api.themoviedb.org/3/movie/top_rated');
        setTopRatedMovies(reducer(topRated));

        const nowPlaying = await Fetcher('https://api.themoviedb.org/3/movie/now_playing');
        setNowPlayingMovies(reducer(nowPlaying));

        const upcoming = await Fetcher('https://api.themoviedb.org/3/movie/upcoming');
        setUpcomingMovies(reducer(upcoming));

      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <MovieDataContext.Provider
      value={{
        Popular: popularMovies,
        TopRated: topRatedMovies,
        Upcoming: upcomingMovies,
        NowPlaying: nowPlayingMovies,
      }}
    >
      {children}
    </MovieDataContext.Provider>
  );
};

export default MovieDataProvider;
