import React, {useState} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import {Menu, X} from 'lucide-react'
import { useUser, SignIn } from '@clerk/clerk-react';
import Sidebar from '../components/Sidebar';

const Layout = () => {

  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  const {user} = useUser();
  
  return user ? (
    <div className='flex flex-col items-start justify-start h-screen'>
      {/* Mobile backdrop overlay - covers entire screen */}
      {sidebar && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 sm:hidden"
          onClick={() => setSidebar(false)}
        />
      )}

      <nav className='w-full px-4 sm:px-6 md:px-8 min-h-14 flex items-center justify-between 
      border-b border-gray-200'>
         <div className='flex items-center gap-1 sm:gap-2 cursor-pointer' onClick={() => navigate('/')}>
                <img src={assets.tool} alt='logo' className='w-6 h-8 sm:w-8 sm:h-10 md:w-10 md:h-12'/>
              <h3 className="relative z-10 text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 text-center">
                Toolie<span className='text-blue-500'> AI</span>
              </h3>
         </div>
        {
          sidebar ? <X onClick={() => setSidebar(false)} className='w-6 h-6 text-gray-600 sm:hidden'/>
          : <Menu onClick={() => setSidebar(true)} className='w-6 h-6 text-gray-600 sm:hidden'/>
        }
      </nav>
      <div className='flex-1 w-full flex h-[calc(100vh-64px)] relative'>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>        
        <div className='flex-1 overflow-auto w-full'>
        <Outlet/>
        </div>
      </div>
        
      
    </div>
  ) : (
    <div className='flex items-center justify-center h-screen'>
      <SignIn />
    </div>
  )
}

export default Layout