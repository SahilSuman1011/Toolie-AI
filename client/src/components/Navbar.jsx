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
    <div className={`fixed z-50 w-full backdrop-blur-2xl bg-slate-900/70 flex justify-between items-center h-12 px-4 sm:px-16 xl:px-28 transition-all duration-300 border-b border-slate-800/50 ${hideNavbar ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className='flex items-center gap-2'>
          <img src={assets.tool} alt='logo' className='w-4 h-10 sm:w-12 cursor-pointer' onClick={() => {
              navigate('/')
          }}/>
      <h3 className="relative z-10 text-2xl font-bold text-white mb-2 text-center">
        Toolie<span className='text-blue-500'> AI</span>
      </h3>
        </div>

        {user ? (
          <UserButton />
        ) : (
          <button onClick={openSignIn} className='flex items-center gap-2 rounded-full text-sm cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 shadow-sm hover:shadow-md'>
            Get Started <ArrowRight className='w-4 h-4'/> 
          </button>
        )}

    </div>
  )
}

export default Navbar