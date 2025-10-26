import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ArrowBigRight, ArrowRight } from 'lucide-react'
const Hero = () => {

  const navigate = useNavigate() 
  return (
    <div className='px-3 sm:px-20 xl:px-32 relative flex flex-col w-full
    bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat
    min-h-screen pt-28 pb-2'>
    <div className='text-center'>
      <a
        href='https://cal.com/sahil-suman'
        target='_blank'
        rel='noopener noreferrer'
        aria-label='Book a live demo on Cal.com'
        className='flex items-center justify-center mt-5 gap-3 hover:scale-102 active:scale-95 transition
          border border-slate-600 text-gray-50 rounded-full px-3 py-2 inline-flex max-w-max mx-auto'
      >
        <div className='w-2 h-2 bg-green-600 rounded-full' />
        <span className='text-[12px] text-slate-600'>Book a live demo today</span>
      </a>
            <h1 className='text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
            font-semi-bold mx-auto leading-tight'>
        The<span className='text-[#2F80ED] font-semibold'> AI Toolbox</span> for <br/> Modern Builders</h1>
        <p className='mt-5 max-w-sm sm:max-w-lg lg:max-w-2xl mx-auto
        text-lg sm:text-xl text-gray-600 leading-relaxed'>Supercharge your creations with our collection of intelligent, <br/> easy-to-use AI tools and enhance your workflow.</p>
        </div>

        <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs py-4'>
        <button onClick={() => navigate('/ai')} className='bg-[#2F80ED] text-white px-8 py-3 rounded-lg
        hover:scale-102 active:scale-95 transition cursor-pointer border border-gray-300'>
            Try Toolie AI Now
        </button>
        <button className='bg-white px-8 py-3 rounded-lg border
        border-gray-300 hover:scale-102 active:scale-95 transition cursor-pointer'>
        Watch demo
        </button>
        </div>

        <div className='flex items-center gap-4 mt-6 mx-auto text-gray-600'>
            <img src={assets.user_group} alt="" className='h-8'/> Trusted by People Everywhere
        </div>
    </div>
  )
}

export default Hero