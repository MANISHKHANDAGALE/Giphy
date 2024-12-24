import React from 'react'
import { useContext } from 'react';
import {GifContext} from '../Context/GifContext'
import { VscFlame } from "react-icons/vsc";
const filters = [
  {
    title: "GIFs",
    value: "gifs",
    background:
      "bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500",
  },
  {
    title: "Stickers",
    value: "stickers",
    background: "bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500",
  },
  {
    title: "Text",
    value: "text",
    background: "bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500",
  },
];
const FilterGifs = ({alignLeft = false, showtrending = false}) => {
  const {filter,setFilter} = useContext(GifContext);
  return (

    <div className={` flex gap-3 my-4 ${alignLeft?"":"justify-end"} ${showtrending?"justify-between flex-col sm:flex-row sm:items-center" : ""} `}>
{showtrending && (
   <span className='flex gap-2 items-center'>{showtrending && (
     <VscFlame size={35} className='text-red-600' />
   )}
   <span className='font-semibold text-gray-400 text-lg'>Trending</span>
   </span>
)}
<div className='bg-gray-800 rounded-full flex min-w-80'>
  {filters.map((f)=>(
    <span onClick={()=> setFilter(f.value)} className={`font-semibold py-2 w-1/3 text-center rounded-full cursor-pointer ${filter === f.value?f.background : ""} `}>{f.title}</span>
  ))}
</div>
    </div>
  )
}

export default FilterGifs