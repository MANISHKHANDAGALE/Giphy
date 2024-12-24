import React, { useContext, useEffect } from 'react'
import { GifContext } from '../Context/GifContext'
import FilterGifs from '../Components/FilterGifs'
import Gifs from '../Components/Gifs'
const Home = () => {
  const {gf,gifs, setGifs,filter} = useContext(GifContext)
  const TrendingGifs = async ()=>{
    const {data} = await gf.trending({
      limit : 30 ,
      rating   : 'g',
      type : filter
    })
    setGifs(data)
  }

  useEffect(()=>{
    TrendingGifs();
    
  },[filter])

  return (
    <div >

      <img src="/banner.gif" alt=""
      className='mt-2 rounded w-full' />
      <FilterGifs />
      {/* rendering gifs */}
      <div className='columns-2 md:columns-3 lg:columns-4 gap-2'>
        {gifs && gifs.map((gifs)=>{
return(
  <Gifs gif={gifs} key={gifs.title} />
)
})}
      </div>
    </div>
  )
}

export default Home