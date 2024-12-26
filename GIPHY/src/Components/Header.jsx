import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { RiMenu2Fill } from "react-icons/ri";
import { RiMenu3Fill } from "react-icons/ri";
import {GifContext} from '../Context/GifContext';
import GifSearch from './GifSearch';


// const Headercomp = ({title}) => {
//     return (
//         <div className='flex gap-4  '>

//         {title.map((title,index)=>(
//             <Link key={index} to = '/' className='px-4 py-1 hover:gradient border-b-4 hidden lg:block'>
//             <h1>{title}</h1>
//             </Link>
//         ))}

// </div>
//     );
// };

const Header = () => {
    const {gf,  favorites} = useContext(GifContext)
    
    const fetchGifsCategories = async () =>{
    const {data} = await gf.categories();
    setCategories(data)
    }
    const [categories, setCategories] = useState([])
    const [showCategories, setShowCategories] = useState(false)

    // const titles = ['reaction', 'Ajectives', 'Animals', 'Anime', 'Art & Design' ]
useEffect(()=>{
    fetchGifsCategories();
},[])
  return (
      <nav >
        <div className='  relative flex items-center justify-between py-4 gap-4 mb-2'>

        
<Link to = '/' className='flex gap-2'>
<img src="logo.svg" className='w-8' alt="logo" />
<h1 className='text-2xl md:text-5xl tracking-tight cursor-pointer font-bold '>GIPHY</h1>
</Link>
<div className='flex gap-4 items-center overflow-hidden mr-5 md:mr-0'>
 {/* rendering categories */}
{/* <Headercomp title={titles}  /> */}
{categories?.slice(0,5)?.map((category)=>(

<Link key={category.name}  to = {`/${category.name_encoded}`} className='px-4 py-1 hover:gradient border-b-4 hidden lg:block'>
            <h1>{category.name}</h1>
            </Link>
))}
<button onClick={()=>setShowCategories(!showCategories)}>
<RiMenu2Fill
size={35}
className={` hover:gradient cursor-pointer ${showCategories? "gradient" : " "}  border-b-4 hidden lg:block transition-all duration-500 ease-in-out`}
/>
</button>
<div className='bg-gray-700 h-9 text-md  pt-1.5   px-6 rounded cursor-pointer hover:text-black hover:bg-red-700   '>
    <Link to='/favorites' className='w-full'>
    <h1>Favorites Gifs</h1>
     </Link>
</div>
<button className='md:hidden sm:block'>
<RiMenu3Fill
onClick={()=>setShowCategories(!showCategories)}
size={35}
className={` hover:gradient cursor-pointer ${showCategories? "gradient" : " "}  border-b-4  transition-all duration-500 ease-in-out`}
/>
</button>
{showCategories && (
<div className='absolute right-0 top-20 px-10 pt-6 pb-9 w-full gradient z-20 rounded-lg'>
    <span className="text-3xl font-extrabold">Categories</span>
    <hr className="bg-gray-100 opacity-50 my-5" />
    <div className='grid md:grid-cols-4 grid-cols-2 gap-4'>
        {categories?.map((category)=>(

        <Link key={category.name}
        to={`/${category.name_encoded}`} className=' font-bold'>
            <h1 onClick={()=>setShowCategories(!showCategories)}>{category.name}</h1>
        </Link>
        ))}
        {/* <Link to='/Ajectives' className='hover:gradient font-bold'>
            <h1>Ajectives</h1>
        </Link>
        <Link to='/Animals' className='hover:gradient font-bold'>
            <h1>Animals</h1>
        </Link>
        <Link to='/Anime' className='hover:gradient font-bold'>
            <h1>Anime</h1>
        </Link>
        <Link to='/Art & Design' className='hover:gradient font-bold'>
            <h1>Art & Design</h1>
        </Link> */}
    </div>
</div>
)}
</div>
</div>
<GifSearch />
      </nav>
      
    
  )
}

export default Header