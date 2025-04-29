import React, { useState, useEffect } from 'react';
import MovieDataContext from './MovieDataContext.js';
import Fetcher from './Fetcher.js';

const MovieDataProvider = ({ children }) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popular = await Fetcher('https://api.themoviedb.org/3/movie/popular');
        setPopularMovies(popular.results);

        const topRated = await Fetcher('https://api.themoviedb.org/3/movie/top_rated');
        setTopRatedMovies(topRated.results);

        const nowPlaying = await Fetcher('https://api.themoviedb.org/3/movie/now_playing');
        setNowPlayingMovies(nowPlaying.results);

        const upcoming = await Fetcher('https://api.themoviedb.org/3/movie/upcoming');
        setUpcomingMovies(upcoming.results);

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
