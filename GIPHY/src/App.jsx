
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './Layouts/AppLayout'
import Home from './Pages/Home'
import Category from './Pages/Category'
import Search from './Pages/Search'
import  Favorites  from './Pages/Favorites'
import SingleGif from './Pages/SingleGif'
import GifProvider from './Context/GifContext'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children:[
      {
        path:'/',
        element:<Home />,
      },

      {
        path:'/:category',
        element:<Category />,
      },
      {
        path:'/Favorites',
        element:<Favorites />,
      },
      {
        path:'/search/:query',
        element:<Search />,
      },
      {
        path:'/:type/:slug',
        element:<SingleGif />,
      }
    ]
  }
])


function App() {

  return (
   
        <>
        <GifProvider>

        <RouterProvider router={router} />
        </GifProvider>
        
        

        
       
        </>
  )
}

export default App
