import { useState } from "react"
import React from 'react'
import { useNavigate } from "react-router-dom";
import { VscSearch } from "react-icons/vsc";
import { HiMiniXMark } from "react-icons/hi2";
const GifSearch = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const searchGifs = async () =>{
        if(query.trim() ===''){
            console.log("Query is empty. Returning early.");
            return;
        }
        console.log("Navigating to search results for:", query);
        navigate(`/search/${query}`)

    };
    console.log(query)
  return (
    <div className="flex relative cursor-pointer">
        <input type="text"
        value={query}
        placeholder="Search Gifs and Stickers"
        onChange={(e)=> setQuery(e.target.value)}
        className="w-full  py-4 text-xl pl-4  text-black rounded-tl rounded-bl border border-gray-300 outline-none "
        />
        {query && (
            <button onClick={()=> setQuery('')}
            className="absolute bg-gray-300 rounded-full right-20 top-[1.2rem] mr-2 text-black"
            >
                <HiMiniXMark size={25} />
            </button>
        )}
        <button 
        onClick={searchGifs}
        className="bg-gradient-to-tr from-pink-600 to-pink-400 text-white px-4 py-2 rounded-tr rounded-br ">
        <VscSearch
        size={30}
        />
        </button>
    </div>
  )
}

export default GifSearch