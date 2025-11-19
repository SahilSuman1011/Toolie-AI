import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArrowRight, Sparkles, Zap, BarChart3 } from 'lucide-react'
import LogoScroller from './LogoScroller.jsx'

const Hero = () => {
  const navigate = useNavigate()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className='relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden bg-white selection:bg-blue-100 pt-28 pb-20'>
      
      {/* --- ANIMATED BACKGROUND --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Moving Blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        {/* Radial fade for the grid center */}
        <div className="absolute inset-0 bg-white/60 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      {/* --- THE FIX: BOTTOM FADE MASK --- 
          This creates the smooth transition to the white section below */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent z-20 pointer-events-none"></div>

      {/* --- CONTENT CONTAINER --- */}
      <div className='relative z-30 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 text-center'>
        
        {/* Floating Icons */}
        <div className="hidden lg:block absolute top-0 left-10 animate-bounce duration-[3000ms]" style={{ transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * -1}px)` }}>
            <div className="p-3 bg-white rounded-2xl shadow-xl border border-gray-100 transform -rotate-12">
                <Zap className="w-6 h-6 text-yellow-500 fill-current" />
            </div>
        </div>
        <div className="hidden lg:block absolute bottom-20 right-10 animate-bounce duration-[4000ms]" style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}>
            <div className="p-3 bg-white rounded-2xl shadow-xl border border-gray-100 transform rotate-12">
                <BarChart3 className="w-6 h-6 text-blue-500" />
            </div>
        </div>

        {/* Badge */}
        <a
          href='https://cal.com/sahil-suman'
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-2 px-3 py-1 mb-8 text-sm font-medium text-blue-700 transition-all bg-blue-50 border border-blue-100 rounded-full hover:bg-blue-100 hover:shadow-sm cursor-pointer'
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Book a live demo
          <ArrowRight className='w-3 h-3' />
        </a>

        {/* Headline */}
        <h1 className='max-w-5xl mx-auto text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-8xl mb-6'>
          The <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 animate-gradient'>AI Toolbox</span> <br className='hidden sm:block' />
          for Modern Builders
        </h1>

        {/* Subheadline */}
        <p className='max-w-2xl mx-auto text-lg text-slate-600 sm:text-xl leading-relaxed mb-6'>
          Supercharge your creations with our collection of intelligent, easy-to-use AI tools. 
          Stop building from scratch and start generating.
        </p>

        {/* Buttons */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-4 w-full'>
          <button 
            onClick={() => navigate('/ai')} 
            className='relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none w-full sm:w-auto group'
          >
            <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
            <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl transition-all group-hover:bg-slate-800 gap-2'>
              <Sparkles className="w-4 h-4 text-yellow-300" />
              Try Toolie AI Now
            </span>
          </button>
          
          <button className='w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-700 px-8 py-3.5 rounded-full text-sm font-bold border border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md transition-all duration-200'
          >
            Watch demo
          </button>
        </div>

        {/* Social Proof */}
        <div className="mt-6 flex items-center justify-center mx-auto divide-x divide-gray-300 animate-fade-in-up">
          <div className="flex -space-x-3 pr-3">
            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="image" className="w-8 h-8 rounded-full border-2 border-white hover:-translate-y-1 transition z-1" />
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="image" className="w-8 h-8 rounded-full border-2 border-white hover:-translate-y-1 transition z-[2]" />
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop" alt="image" className="w-8 h-8 rounded-full border-2 border-white hover:-translate-y-1 transition z-[3]" />
            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="image" className="w-8 h-8 rounded-full border-2 border-white hover:-translate-y-1 transition z-[4]" />
          </div>
          <div className="pl-3">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
              </svg>
              <p className="text-gray-600 font-small ml-2">5.0</p>
            </div>
            <p className="text-sm text-gray-500">Trusted by Users<span className="font-medium text-gray-800"> Globally</span></p>
          </div>
        </div>
        <br/>
        <br/>
        <LogoScroller/>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default Hero