import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { GifContext } from '../Context/GifContext'
import FilterGifs from '../Components/FilterGifs'
import Gifs from '../Components/Gifs'
const Search = () => {
  const [searchResult, setSearchResult] = useState([])
  const {gf,filter} = useContext(GifContext)
  const {query} = useParams();

  const fetchSearchResult = async ()=>{
    const {data} = await gf.search(query, {
      sort: "relevant",
      lang: "en",
      type: filter,
      limit: 50,
    });
    setSearchResult(data)
  }
  useEffect(()=>{
    fetchSearchResult();
  },[filter])
  return (
    <div className='my-4'>
      
      <h2 className="text-5xl pb-3 font-extrabold" >{query}</h2>
      <FilterGifs alignLeft="true" />
{searchResult.length > 0 ? (
<div className='columns-2 md:columns-3 lg:columns-4 gap-2 '>
  {searchResult.map((gif)=>(
    <Gifs gif={gif} key={gif.id} />
  ))}
</div>
):(
  <span>No Result Found for {query}</span>
)}
      </div>
  )
}

export default Search