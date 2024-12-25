import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { GifContext } from '../Context/GifContext'
import Gifs from '../Components/Gifs'
const Favorites = () => {
  const [favoritesGifs, setfavoritesGifs] = useState([])
  const {gf,favorites} = useContext(GifContext)

  const fetchFavoritesGifs = async () =>{
    const {data} = await gf.gifs(favorites)
    setfavoritesGifs(data)
  }
  useEffect(()=>{
    fetchFavoritesGifs();
  },[])
  return (
    <div className='my-2 '>
      <span className='font-extrabold text-4xl '>My Favorites</span>
      <div className='columns columns-2 md:columns-3 lg:columns-4 '>
        {favoritesGifs?.map((gif)=>(
          <Gifs gif={gif} key={gif.id} />
        ))}
      </div>
      </div>
  )
}

export default Favorites