import { createContext } from 'react';

const MovieDataContext = createContext({
  Popular: [],
  TopRated: [],
  Upcoming: [],
  NowPlaying: [],
});

export default MovieDataContext;