import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'

const AppLayout = () => {
  return (
    <div className='bg-black text-white min-h-screen'>
      <div className='container mx-auto px-6 py-4'>
<Header />
      
      <main>
      <Outlet />
      </main>
      </div>
    </div>
  )
}

export default AppLayout