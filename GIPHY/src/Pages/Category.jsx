import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GifContext } from '../Context/GifContext';
import { useContext } from 'react';
import Gifs from '../Components/Gifs';
import FollowOn from '../Components/FollowOn';
const Category = () => {
  const {category} = useParams();
  const [result, setResult] = useState([]);
  const {gf} = useContext(GifContext)
  const fetchresult = async () =>{
    const {data} = await gf.gifs(category,category)
    setResult(data)
  }
 useEffect(()=>{
fetchresult();
 },[category])
  console.log(result)
  return (
     
    <div className='flex flex-col sm:flex-row gap-4 my-4'>
      <div className='w-full sm:w-72'>
        {result.length > 0  && (
          <Gifs gif={result[0]} />
          
        )}
         <span className="text-gray-400 text-sm pt-2">
          Don&apos;t tell it to me, GIF it to me!
        </span>
        <FollowOn />
      </div>
      <div>
      <h2 className="text-4xl pb-1 font-extrabold capitalize my-4">{category.split('-').join('&')} GIFS</h2>
      <h2 className="text-lg text-gray-400 pb-3 font-bold hover:text-gray-50 cursor-pointer">
          @{category}
        </h2>
      {result.length > 0 && (
<div className='columns-2 md:columns-5 w-full'>
  {result?.slice(1).map((gif)=>(
<Gifs gif={gif} />
  ))}
</div>
      )}

</div>
    </div>
    
  )
}

export default Category