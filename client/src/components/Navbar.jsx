import React, { useEffect, useState } from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
    const navigate = useNavigate()
    const {user} = useUser()
    const {openSignIn} = useClerk()
    const [hideNavbar, setHideNavbar] = useState(false)

    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setHideNavbar(false)
      }
      
      const observer = new MutationObserver(() => {
        const videoModal = document.querySelector('[class*="bg-black/50"][class*="backdrop-blur"]')
        setHideNavbar(!!videoModal)
      })
      
      observer.observe(document.body, { childList: true, subtree: true })
      window.addEventListener('keydown', handleKeyDown)
      
      return () => {
        observer.disconnect()
        window.removeEventListener('keydown', handleKeyDown)
      }
    }, [])

  return (
    <div className={`fixed z-50 w-full backdrop-blur-2xl bg-slate-900/70 flex justify-between items-center h-14 sm:h-16 md:h-12 px-3 sm:px-6 md:px-10 lg:px-16 xl:px-28 transition-all duration-300 border-b border-slate-800/50 ${hideNavbar ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className='flex items-center gap-1 sm:gap-2'>
          <img src={assets.tool} alt='logo' className='w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 hover:cursor-pointer transition-all' onClick={() => {
              navigate('/')
          }}/>
          <h3 className="relative z-10 text-base xs:text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold text-white hover:cursor-pointer mb-1 sm:mb-2 text-center transition-all">
            Toolie<span className='text-blue-500'> AI</span>
          </h3>
        </div>

        {user ? (
          <div className='scale-90 sm:scale-100'>
            <UserButton />
          </div>
        ) : (
          <button onClick={openSignIn} className='flex items-center gap-1 sm:gap-2 rounded-full text-xs sm:text-sm cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 sm:px-4 sm:py-1.5 shadow-sm hover:shadow-md'>
            <span className='hidden xs:inline'>Get Started</span>
            <span className='inline xs:hidden'>Start</span>
            <ArrowRight className='w-3 h-3 sm:w-4 sm:h-4'/> 
          </button>
        )}

    </div>
  )
}

export default Navbar