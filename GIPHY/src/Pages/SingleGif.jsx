import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GifContext } from '../Context/GifContext';
import Gifs from '../Components/Gifs';
import { FaChevronCircleUp } from "react-icons/fa";
import { FaChevronCircleDown } from "react-icons/fa";
import FollowOn from "../Components/FollowOn"
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
{gif?.user && (
  <>
  <div className='flex items-center'>
  <img src={gif?.user?.avatar_url} alt={gif.display_name}
    className='h-16'
    />
    <div className='px-2 gap-2 items-center'>
      <h2 className='font-bold'>
        {gif?.user?.display_name}
      </h2>
      <h2 className='faded-text'>
        @{gif?.user?.username}
      </h2>
    </div>
  </div>
  <div className='py-2 whitespace-pre-line text-sm text-gray-500'>
    {gif?.user?.description && (
      <p>
        {readMore ? (
          gif?.user?.description
        ):(
          gif?.user?.description.slice(0,100) + "..."
        )}
     <div className='flex items-center faded-text cursor-pointer' onClick={()=> setReadMore(!readMore)}>
{readMore ? (

  <>
  read less <FaChevronCircleDown size={20} className='ml-2 mt-1' />
  </>
):(

  <>
  read more <FaChevronCircleUp size={20} className='ml-2 mt-1' />
  </>
)}
     </div>
      </p>
    )}
  </div>
  </>
)}
< FollowOn />
<div className='divider'/>
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