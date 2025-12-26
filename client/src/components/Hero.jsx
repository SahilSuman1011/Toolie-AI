import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles, Zap, BarChart3, X, Play } from 'lucide-react'
import AnimatedGradientBg from './AnimatedGradientBg'

const Hero = () => {
  const navigate = useNavigate()
  const [showVideo, setShowVideo] = useState(false)

  return (
    <div className='relative flex flex-col items-center w-full h-auto xl:min-h-screen overflow-hidden bg-slate-900 pt-24 pb-6 md:pt-28 md:pb-8 xl:pt-36 xl:pb-12'>
      
      {/* Animated Gradient Background */}
      <AnimatedGradientBg />

      {/* Bottom Fade Mask */}
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-32 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent z-20 pointer-events-none"></div>

      {/* Floating Icons - Left Side */}
      <div className="absolute left-4 md:left-12 lg:left-20 top-1/4 z-10 hidden lg:block">
        <div className="relative">
          {/* Lightning Icon */}
          <div className="absolute top-8 left-0 w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl shadow-lg flex items-center justify-center rotate-12 animate-float">
            <Zap className="w-8 h-8 text-white" fill="currentColor" />
          </div>
          
          {/* Sparkles Icon */}
          <div className="absolute top-32 -left-8 w-14 h-14 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl shadow-lg flex items-center justify-center -rotate-6 animate-float-delayed">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
        </div>
      </div>

      {/* Floating Icons - Right Side */}
      <div className="absolute right-4 md:right-12 lg:right-20 top-1/3 z-10 hidden lg:block">
        <div className="relative">
          {/* Chart Icon */}
          <div className="absolute -top-16 right-0 w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl shadow-lg flex items-center justify-center -rotate-12 animate-float-slow">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          
          {/* Zap Icon */}
          <div className="absolute top-36 -right-4 w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center rotate-6 animate-float">
            <Zap className="w-7 h-7 text-white" />
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className='relative z-30 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 text-center flex flex-col items-center w-full'>
        
        {/* Badge */}
        <a
          href='https://cal.com/sahil-suman'
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs md:text-sm font-medium text-teal-300 transition-all bg-teal-900/30 border border-teal-700 rounded-full hover:bg-teal-900/50 hover:shadow-sm cursor-pointer whitespace-nowrap'
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>
          Book a live demo
          <ArrowRight className='w-3 h-3' />
        </a>

        {/* Headline */}
        <h1 className='max-w-5xl mx-auto text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white mb-6 px-2'>
          The <span className='text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-cyan-500 to-amber-500 animate-gradient'>AI Toolbox</span> <br className='hidden md:block' />
          for Modern Builders
        </h1>

        {/* Subheadline */}
        <p className='relative max-w-3xl mx-auto text-s sm:text-sm md:text-base text-slate-300 leading-relaxed mb-8 px-4'>
          Supercharge your creations with our collection of <span className='relative inline-block font-medium text-slate-200'>intelligent, easy-to-use AI tools.
            <svg className='absolute -bottom-1 left-0 w-full h-2' viewBox='0 0 200 8' preserveAspectRatio='none'>
              <path 
                d='M0,4 Q50,2 100,4 T200,4' 
                fill='none' 
                stroke='currentColor' 
                strokeWidth='2' 
                className='text-emerald-500 opacity-50'
              />
              {/* Animated sparkle circles */}
              <circle r="2" className='text-emerald-500' fill="currentColor">
                <animateMotion dur="3s" repeatCount="indefinite" path="M0,4 Q50,2 100,4 T200,4" />
              </circle>
              <circle r="1.5" className='text-amber-500' fill="currentColor">
                <animateMotion dur="3s" repeatCount="indefinite" begin="1s" path="M0,4 Q50,2 100,4 T200,4" />
              </circle>
              <circle r="1" className='text-cyan-500' fill="currentColor">
                <animateMotion dur="3s" repeatCount="indefinite" begin="2s" path="M0,4 Q50,2 100,4 T200,4" />
              </circle>
            </svg>
          </span>
        </p>

        {/* Buttons */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto px-4 sm:px-0'>
          <button 
            onClick={() => navigate('/ai')} 
            className='relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none w-full sm:w-auto group'
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#10b981_0%,#f59e0b_50%,#10b981_100%)]" />
            <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-700 px-6 sm:px-8 text-sm font-semibold text-white backdrop-blur-3xl transition-all duration-300 group-hover:scale-105 gap-2'>
              <Sparkles className="w-4 h-4" />
              Try Toolie AI Now
            </span>
          </button>
          
          <button 
            onClick={() => setShowVideo(true)}
            className='w-full sm:w-auto inline-flex items-center cursor-pointer justify-center gap-2 bg-slate-800 text-slate-200 px-8 py-3.5 rounded-full text-sm font-bold border border-slate-700 hover:border-teal-600 hover:bg-slate-750 hover:shadow-md transition-all duration-200'
          >
            <Play className="w-4 h-4" />
            Watch demo
          </button>
        </div>

        {/* Social Proof */}
        <div className="mt-8 md:mt-10 flex flex-col md:flex-row items-center justify-center gap-4 animate-fade-in-up">
          <div className="flex -space-x-3">
            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="User 1" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-slate-800 hover:-translate-y-1 transition z-10" />
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="User 2" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-slate-800 hover:-translate-y-1 transition z-20" />
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="User 3" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-slate-800 hover:-translate-y-1 transition z-30" />
            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="User 4" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-slate-800 hover:-translate-y-1 transition z-40" />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 24 24"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>
              ))}
            </div>
            <span className="text-sm font-bold text-slate-300">5.0</span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">| Trusted Globally</span>
          </div>
        </div>

{/* Video Modal */}
      {showVideo && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[100] flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowVideo(false)}
        >
          <div 
            className="relative bg-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl aspect-video overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-slate-900/90 hover:bg-slate-900 rounded-full shadow-lg transition-all hover:scale-110"
            >
              <X className="w-5 h-5 text-slate-300" />
            </button>

            {/* Video Player */}
            <div className="w-full h-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/sTGnmhGuhtg?autoplay=1"
                title="Toolie AI Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
  )
}

export default Hero