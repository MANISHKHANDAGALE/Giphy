import React from 'react'
import { Link } from 'react-router-dom'

const Gifs = ({gif,hover = true}) => {

    console.log(gif)
  return (
    <Link to={`${gif.type}/${gif.slug}`}>
<div className='w-full mb-2 cursor-pointer relative group aspect-video'>
    <img src={gif?.images?.fixed_width.webp} alt={gif.title}
    className='w-full object-cover rounded transition-all duration-500 '
    />
    {hover && 
    (
      
      <div className='absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-transparent via-transparent to-black font-bold flex items-end gap-2 p-2'>
        <img src={gif?.user?.avatar_url} alt={gif?.user?.display_name}  
        className='h-8'
        />
        <span>{gif?.user?.display_name}</span>
        
      </div>
    )
    }
</div>
    </Link>
  )
}

export default Gifs