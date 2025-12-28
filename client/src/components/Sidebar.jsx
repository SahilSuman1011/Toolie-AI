import React from 'react'
import {Protect, useClerk, useUser } from '@clerk/clerk-react';
import { Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, Users, Crown } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  {to : '/ai', label: 'Dashboard', Icon: House, premium: false},
  {to : '/ai/write-article', label: 'Write Article', Icon: SquarePen, premium: false},
  {to : '/ai/blog-titles', label: 'Blog Titles', Icon: Hash, premium: false},
  {to : '/ai/generate-images', label: 'Generate Images', Icon: Image, premium: true},
  {to : '/ai/remove-background', label: 'Remove Background', Icon: Eraser, premium: true},
  {to : '/ai/remove-object', label: 'Remove Object', Icon: Scissors, premium: true},
  {to : '/ai/linkedin-optimizer', label: 'LinkedIn Optimizer', Icon: FileText, premium: true},
  {to : '/ai/community', label: 'Community', Icon: Users, premium: false},
]

const Sidebar = ({sidebar, setSidebar}) => {

    const {user} = useUser();
    const {signOut, openUserProfile} = useClerk()

  return (
    <div className={`w-60 bg-slate-900 border-r border-slate-800/50 flex
    flex-col justify-between items-center sm:relative max-sm:fixed max-sm:z-20 max-sm:top-0 
    max-sm:left-0 max-sm:bottom-0 max-sm:h-screen ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'}
    transition-all duration-300 ease-in-out`}>
    <div className='my-7 w-full'>
        <img src={user.imageUrl} alt='User Avatar' className='w-12 rounded-full mx-auto ring-2 ring-emerald-500/30'/>
        <h1 className='mt-2 text-center text-white font-semibold'>{user.fullName}</h1>
        <div className='px-4 mt-6 text-sm text-slate-300 font-medium space-y-1'>
          {navItems.map(({to, label, Icon, premium}) => (
            <NavLink key={to} to={to} end={to === '/ai'} onClick={() => setSidebar(false)}
            className={({isActive})=> `px-3.5 py-2.5 flex items-center gap-3
            rounded-lg transition-all duration-200 ease-in-out hover:scale-[1.02] 
            ${isActive ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'hover:bg-slate-800/50 hover:text-emerald-400'}`
            }>
              {
                ({isActive}) => (
                  <>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`}/>
                  <span className="flex-1">{label}</span>
                  {premium && (
                    <Crown className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-amber-500'}`} />
                  )}
                  </>
                )
              }
            </NavLink>
          ))}
        </div>
    </div>

    <div className='w-full border-t border-slate-800/50 p-4 px-5 flex items-center
    justify-between bg-slate-800/30'>
      <div onClick={openUserProfile} className='flex gap-2 items-center cursor-pointer group'>
        <img src={user.imageUrl} className='w-8 rounded-full ring-2 ring-transparent group-hover:ring-emerald-500/30 transition-all' alt='' />
        <div>
          <h1 className='text-sm font-medium text-white'>{user.fullName}</h1>
          <p className='text-xs text-slate-400'>
            <Protect plan='premium' fallback="Free">Premium </Protect>
            Plan
          </p>
        </div>
      </div>
      <LogOut onClick={signOut} className='w-4.5 text-slate-400
      hover:text-emerald-400 transition cursor-pointer'/>
    </div>

    </div>
  )
}

export default Sidebar