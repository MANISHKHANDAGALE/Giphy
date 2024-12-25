import { createContext, useContext, useState, } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { useEffect } from "react";
// Create GifContext
export const GifContext = createContext(); // Export GifContext

const GifProvider = ({ children }) => {
  const gf =  new GiphyFetch(import.meta.env.VITE_GIPHY_KEY)
  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoriteGIFs")) || [];
    setFavorites(favorites);
  }, []);

  const addtoFavorites = (id) => {
    console.log(id);
    if (favorites.includes(id)) {
      // If the item is already in favorites, remove it
      const updatedFavorites = favorites.filter((itemId) => itemId !== id);
      localStorage.setItem("favoriteGIFs", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } else {
      // If the item is not in favorites, add it
      const updatedFavorites = [...favorites];
      updatedFavorites.push(id);
      localStorage.setItem("favoriteGIFs", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    }
  };
  return (
    <GifContext.Provider value={{ gf, gifs, setGifs, filter, setFilter, favorites,addtoFavorites }}>
      {children}
    </GifContext.Provider>
  );
};

export default GifProvider;
