import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GifContext } from '../Context/GifContext';
import Gifs from '../Components/Gifs';

const content = ["gifs", "stickers", "texts"];
const SingleGif = () => {
  const [relatedGifs, setRelatedGifs] = useState([])
  const [gif,SetGif] = useState([])
  const [readMore, setReadMore] = useState(false);
  const {type,slug} = useParams()
  const {gf,atttoFavorites,favorites} = useContext(GifContext)
  const fetch = async () => {
    const GifId = slug.split('-');
    const {data} = await gf.gif(GifId[GifId.length - 1])
    const {data:related} = await gf.related(GifId[GifId.length - 1],{
      limit : 15,
    })
SetGif(data)
setRelatedGifs(related)
  }
  useEffect(()=>{
if(!content.includes(type)){
  throw new Error("invalid type")
}
fetch();
  },[slug])
  return (
    <div className='grid grid-cols-4 gap-4 my-10'>
<div className='hidden sm:block'>
sidebar
</div>
<div className='col-span-4 sm:col-span-3'>
<div className='flex gap-6'>
  <div className='w-full sm:w-3/4'>
<div className='faded-text truncate mb-2'>{gif.title}</div>
<div className='w-1/2'>

<Gifs gif={gif} />
</div>
  </div>
  
favorites/embeded
  
</div>
<div>
  <span className='font-extrabold'>Related Gifs</span>
</div>
</div>
    </div>
  )
}

export default SingleGif