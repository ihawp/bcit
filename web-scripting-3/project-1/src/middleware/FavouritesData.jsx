import { createContext, useState, useEffect } from 'react';

export const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {

  const [loadingFavourites, setLoadingFavourites] = useState(true);

  const [favourites, setFavourites] = useState(() => {
    try {
      const stored = localStorage.getItem('favourites');
      if (stored) {
        setLoadingFavourites(false);
      }
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to load favourites from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (id) => {
    if (!isFavourite(id)) setFavourites(prev => [...prev, id]);
  };

  const removeFavourite = (id) => {
    setFavourites(prev => prev.filter(fav => fav !== id));
  };

  const isFavourite = (id) => {
    return favourites.includes(id);
  };

  return (
    <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite, isFavourite, loadingFavourites }}>
      {children}
    </FavouritesContext.Provider>
  );
};
