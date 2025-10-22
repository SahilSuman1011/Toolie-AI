import React from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
    const navigate = useNavigate()
    const {user} = useUser()
    const {openSignIn} = useClerk()

  return (
    <div className='fixed z-50 w-full backdrop-blur-2xl flex justify-between items-center h-18 px-4 sm:px-16 xl:px-28'>
        <img src={assets.TAI} alt='logo' className='w-36 h-42 sm:w-36 cursor-pointer pt-8' onClick={() => {
            navigate('/')
        }}/>

        {
        user ? <UserButton /> 
  :
  (
  <button onClick={openSignIn} className='flex items-center gap-2 rounded-full text-sm
  cursor-pointer hover:scale-102 active:scale-95 transition bg-[#2F80ED] text-white px-4 py-1.5'>
        Get Started <ArrowRight className='w-4 h-4'/> 
        </button>
        )
        }

    </div>
  )
}

export default Navbar