import React from 'react'
import { Link } from 'react-router-dom'

const Gifs = ({gif,hover = true}) => {

    console.log(gif)
  return (
    <Link to={`${gif.type}/${gif.slug}`}>
<div className='w-full mb-2 cursor-pointer relative'>
    <img src={gif?.images?.fixed_width.webp} alt={gif.title}
    className='w-full object-cover rounded transition-all duration-500 '
    />
</div>
    </Link>
  )
}

export default Gifs