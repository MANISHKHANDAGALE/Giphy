import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GifContext } from '../Context/GifContext';
import Gifs from '../Components/Gifs';
import { FaChevronCircleUp } from "react-icons/fa";
import { FaChevronCircleDown } from "react-icons/fa";
import FollowOn from "../Components/FollowOn"
import { HiShare } from "react-icons/hi";
import { HiMiniHeart } from "react-icons/hi2";
import {FaPaperPlane} from "react-icons/fa6";
import {IoCodeSharp} from "react-icons/io5";

const content = ["gifs", "stickers", "texts"];
const SingleGif = () => {
  const [relatedGifs, setRelatedGifs] = useState([])
  const [gif, SetGif] = useState([])
  const [readMore, setReadMore] = useState(false);
  const { type, slug } = useParams()
  const { gf, addtoFavorites, favorites } = useContext(GifContext)
  const fetch = async () => {
    const GifId = slug.split('-');
    const { data } = await gf.gif(GifId[GifId.length - 1])
    const { data: related } = await gf.related(GifId[GifId.length - 1], {
      limit: 15,
    })
    SetGif(data)
    setRelatedGifs(related)
    
  }
  useEffect(() => {
    if (!content.includes(type)) {
      throw new Error("invalid type")
    }
    fetch();
    
  }, [slug,type])
  const handleRelatedGifClick = (gif) => {
    const newSlug = gif.slug; 
    if (slug !== newSlug) {
      fetch()
      setTimeout(() => {
        window.location.reload();
      }, 0);
    }
  };
  
  const shareGif =({ gifUrl })=> {
      const message = `Check out this GIF: ${gifUrl}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
  }
  return (
    <div className='grid grid-cols-4 gap-4 my-10 overflow-hidden'>
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
                  ) : (
                    gif?.user?.description.slice(0, 100) + "..."
                  )}
                  <div className='flex items-center faded-text cursor-pointer' onClick={() => setReadMore(!readMore)}>
                    {readMore ? (

                      <>
                        read less <FaChevronCircleDown size={20} className='ml-2 mt-1' />
                      </>
                    ) : (

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
        <div className='divider' />
      </div>
      <div className='col-span-4 sm:col-span-3 '>
        <div className='flex gap-6'>
          <div className='w-full sm:w-3/4'>
            <div className='faded-text truncate mb-2 text-center'>{gif.title}</div>
            <div className=' mx-auto overflow-y-hidden max-w-3xl'>

              <Gifs gif={gif} />
            </div>

            {/* mobile ui */}
            <div className='flex gap-1 sm:hidden'>
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
              <button className="ml-auto items-center" onClick={shareGif}>
                <HiShare size={25} />
              </button>
             
            </div>
          </div>
          <div className='sm:flex hidden flex-col gap-6 mt-6'>

            <button className='flex gap-5 items-center font-bold text-lg'
            onClick={()=> addtoFavorites(gif.id)}
            >
              <HiMiniHeart
                size={30}
                className={`${favorites.includes(gif.id) ? "text-red-500" : ""
                  }`}
              />
              Favorite
            </button>
            <button className='flex gap-5 items-center font-bold text-lg'>
            <FaPaperPlane size={25} />
                Share
              </button>
              <button className='flex gap-5 items-center font-bold text-lg'>
                
              <IoCodeSharp size={30} />
                Embed
              </button>
          </div>
        </div>
        <div>
          <span className='font-extrabold text-3xl ml-[28%]'>Related Gifs</span>
        </div>
      </div>

      {relatedGifs.slice(1).map((gif) => (
        <div className='my-5 gap-4 ' onClick={handleRelatedGifClick} >
          <Gifs gif={gif}  key={gif.id} />
        </div>
      ))}
    </div>
  )
}

export default SingleGif