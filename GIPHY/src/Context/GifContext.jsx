import { createContext, useContext, useState, } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";

// Create GifContext
export const GifContext = createContext(); // Export GifContext

const GifProvider = ({ children }) => {
  const gf =  new GiphyFetch(import.meta.env.VITE_GIPHY_KEY)
  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favorites, setFavorites] = useState([]);
const addtoFavorites = {}
  return (
    <GifContext.Provider value={{ gf, gifs, setGifs, filter, setFilter, favorites,addtoFavorites }}>
      {children}
    </GifContext.Provider>
  );
};

export default GifProvider;
