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
    // FIX 1: Changed 'lg:min-h-screen' to 'xl:min-h-screen'. 
    // This ensures tablets (md/lg) use 'h-auto' and don't stretch nicely to 1300px+ height.
    <div className='relative flex flex-col items-center w-full h-auto xl:min-h-screen overflow-hidden bg-white pt-20 pb-8 md:pt-24 md:pb-12 xl:pt-32 xl:pb-20 max-w-[100vw]'>
      
      {/* --- ANIMATED BACKGROUND --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 -left-4 w-48 h-48 md:w-72 md:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-48 h-48 md:w-72 md:h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-48 h-48 md:w-72 md:h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-white/60 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      {/* Bottom Fade Mask */}
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-32 bg-gradient-to-t from-white via-white/80 to-transparent z-20 pointer-events-none"></div>

      {/* --- CONTENT CONTAINER --- */}
      <div className='relative z-30 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 text-center flex flex-col items-center w-full'>
        
        {/* Floating Icons (Hidden on Mobile) */}
        <div className="hidden lg:block absolute top-0 left-10 animate-bounce duration-[3000ms]" style={{ transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * -1}px)` }}>
            <div className="p-3 bg-white rounded-2xl shadow-xl border border-gray-100 transform -rotate-12">
                <Zap className="w-6 h-6 text-yellow-500 fill-current" />
            </div>
        </div>
        <div className="hidden lg:block absolute bottom-40 right-10 animate-bounce duration-[4000ms]" style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}>
            <div className="p-3 bg-white rounded-2xl shadow-xl border border-gray-100 transform rotate-12">
                <BarChart3 className="w-6 h-6 text-blue-500" />
            </div>
        </div>

        {/* Badge */}
        <a
          href='https://cal.com/sahil-suman'
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs md:text-sm font-medium text-blue-700 transition-all bg-blue-50 border border-blue-100 rounded-full hover:bg-blue-100 hover:shadow-sm cursor-pointer whitespace-nowrap'
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Book a live demo
          <ArrowRight className='w-3 h-3' />
        </a>

        {/* Headline */}
        <h1 className='max-w-5xl mx-auto text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6'>
          The <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 animate-gradient'>AI Toolbox</span> <br className='hidden md:block' />
          for Modern Builders
        </h1>

        {/* Subheadline */}
        <p className='max-w-2xl mx-auto text-base text-slate-600 sm:text-lg md:text-xl leading-relaxed mb-8 px-4'>
          Supercharge your creations with our collection of intelligent, easy-to-use AI tools. 
          Stop building from scratch and start generating.
        </p>

        {/* Buttons */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto px-4 sm:px-0'>
          <button 
            onClick={() => navigate('/ai')} 
            className='relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none w-full sm:w-auto group'
          >
            <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
            <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl transition-all group-hover:bg-slate-800 gap-2 whitespace-nowrap'>
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
        <div className="mt-8 md:mt-10 flex flex-col md:flex-row items-center justify-center gap-4 animate-fade-in-up">
          <div className="flex -space-x-3">
            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="User 1" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white hover:-translate-y-1 transition z-10" />
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="User 2" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white hover:-translate-y-1 transition z-20" />
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="User 3" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white hover:-translate-y-1 transition z-30" />
            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="User 4" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white hover:-translate-y-1 transition z-40" />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>
              ))}
            </div>
            <span className="text-sm font-bold text-slate-700">5.0</span>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">| Trusted Globally</span>
          </div>
        </div>

        {/* FIX 2: Reduced margin-top on tablet (md:mt-10) to pull logos closer */}
        <div className="mt-8 md:mt-10 xl:mt-16 w-full max-w-full overflow-hidden">
            <LogoScroller/>
        </div>

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