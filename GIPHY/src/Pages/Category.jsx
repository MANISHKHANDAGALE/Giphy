import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GifContext } from '../Context/GifContext';
import { useContext } from 'react';
import Gifs from '../Components/Gifs';
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
     
    <div>
      <h2 className="text-4xl pb-1 font-extrabold capitalize my-4">{category}</h2>
      {result.length > 0 && (
<div className='columns-2 md:columns-4'>
  {result?.slice(1).map((gif)=>(
<Gifs gif={gif} />
  ))}
</div>
      )}

    
    </div>
    
  )
}

export default Category