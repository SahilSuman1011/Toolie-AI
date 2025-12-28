import React, { useEffect, useRef, useState } from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { ArrowRight, Zap, Users, Sparkles, Github, Heart, Crown } from 'lucide-react'
import tool from '../assets/tool.png'

const CenterCard = () => {
  return (
    <div className="group relative h-full bg-gradient-to-br from-emerald-900/20 via-cyan-900/20 to-amber-900/20 rounded-2xl overflow-hidden border border-emerald-500/30 backdrop-blur-sm p-3 sm:p-8 md:p-10 flex flex-col items-center justify-center">
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-12 h-12 sm:w-24 sm:h-24 bg-emerald-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-28 sm:h-28 bg-cyan-500/20 rounded-full blur-3xl animate-float-delayed"></div>
      </div>
      
      {/* Logo */}
      <div className="relative z-10 mb-2 sm:mb-4 md:mb-5">
        <img 
          src={tool} 
          alt="Toolie AI Logo" 
          className="w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      {/* Title */}
      <h3 className="relative z-10 text-base sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-3 text-center leading-tight">
        Toolie<span className='text-blue-500'> AI</span>
      </h3>
      
      {/* Subtitle */}
      <p className="relative z-10 text-emerald-300 text-xs sm:text-base mb-2 sm:mb-5 md:mb-6 text-center leading-tight">
        Your Ultimate AI Toolbox
      </p>
      
      {/* Stats */}
      <div className="relative z-10 flex gap-2 sm:gap-6">
        <div className="text-center">
          <div className="flex items-center gap-1 sm:gap-1 text-white font-bold text-sm sm:text-xl mb-0.5 sm:mb-1">
            <Sparkles className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-amber-400" />
            6+
          </div>
          <div className="text-slate-400 text-[10px] sm:text-sm leading-tight">AI Tools</div>
        </div>
       
      </div>
    </div>
  )
}


const ToolCard = ({ tool, onClick }) => {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div 
      ref={cardRef}
      onClick={onClick}
      className={`group relative flex flex-col h-full bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/40 backdrop-blur-sm hover:border-emerald-500/40 hover:bg-slate-800/70 transition-all duration-500 cursor-pointer p-6 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transition: 'opacity 0.6s ease-out, transform 0.6s ease-out' }}
    >
        {/* Premium Badge */}
        {tool.premium && (
          <div className="absolute top-3 right-3 z-10">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 backdrop-blur-sm">
              <Crown className="w-3 h-3 text-amber-400" />
              <span className="text-[10px] font-semibold text-amber-300">PRO</span>
            </div>
          </div>
        )}
        
        {/* Icon */}
        <div className="mb-4">
            <div 
                className="inline-flex w-12 h-12 rounded-xl items-center justify-center bg-slate-700/50 group-hover:scale-110 transition-all duration-500"
                style={{ 
                  border: `1.5px solid ${tool.bg.from}40`
                }}
            >
                <tool.Icon 
                  className="w-6 h-6"
                  style={{ color: tool.bg.from }}
                  strokeWidth={2} 
                />
            </div>
        </div>
        
        {/* Title */}
        <h3 className="text-base font-semibold text-white mb-2 tracking-tight">
            {tool.title}
        </h3>
        
        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-3 font-light">
            {tool.description}
        </p>
        
        {/* Additional Info */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-auto">
            <div className="px-2 py-1 rounded-md bg-slate-700/40 border border-slate-600/30">
                AI Powered
            </div>
        </div>
        
        {/* Arrow Icon */}
        <div className="mt-4 flex justify-end">
            <ArrowRight 
              className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform duration-300"
            />
        </div>
    </div>
  )
}

const AiTools = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const [headerVisible, setHeaderVisible] = useState(false)
  const headerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (headerRef.current) {
      observer.observe(headerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className='relative py-6 sm:py-10 px-3 sm:px-6 lg:px-8 bg-slate-900 overflow-hidden'>
      <div className='max-w-7xl mx-auto'>
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-10 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-emerald-900/30 border border-emerald-700/60 text-emerald-300 text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Powerful Features
          </div>
          
          <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-tight px-2'>
            Everything You Need <br className="hidden sm:block" />
            in <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-cyan-600 to-amber-600">One Place</span>
              <svg className="absolute -bottom-2 left-0 right-0 h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
                <path d="M0,7 Q50,0 100,7 T200,7" fill="none" stroke="url(#gradient-tools)" strokeWidth="3" opacity="0.3"/>
                <defs>
                  <linearGradient id="gradient-tools" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          
        </div>

        {/* Bento Grid Layout */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-[minmax(220px,auto)]'>
          {/* Top Left - AI Article Writer */}
          <div className="min-h-[220px]">
            <ToolCard
              tool={AiToolsData[0]}
              onClick={() => user && navigate(AiToolsData[0].path)}
            />
          </div>
          
          {/* Top Row Spanning 2 columns - Blog Title */}
          <div className="md:col-span-2 lg:col-span-2 min-h-[220px]">
            <ToolCard
              tool={AiToolsData[1]}
              onClick={() => user && navigate(AiToolsData[1].path)}
            />
          </div>

          {/* Top Right - AI Image Generation */}
          <div className="min-h-[220px]">
            <ToolCard
              tool={AiToolsData[2]}
              onClick={() => user && navigate(AiToolsData[2].path)}
            />
          </div>

          {/* Middle Left - Background Removal */}
          <div className="md:row-span-2 h-full min-h-[220px]">
            <ToolCard
              tool={AiToolsData[3]}
              onClick={() => user && navigate(AiToolsData[3].path)}
            />
          </div>

          {/* Center Large Card - 2x2 */}
          <div className="md:col-span-2 lg:col-span-2 md:row-span-2 min-h-[180px] md:min-h-[440px]">
            <CenterCard />
          </div>

          {/* Middle Right - Object Removal */}
          <div className="md:row-span-2 h-full min-h-[220px]">
            <ToolCard
              tool={AiToolsData[4]}
              onClick={() => user && navigate(AiToolsData[4].path)}
            />
          </div>

          {/* Bottom Left - LinkedIn Optimizer */}
          <div className="min-h-[220px]">
            <ToolCard
              tool={AiToolsData[5]}
              onClick={() => user && navigate(AiToolsData[5].path)}
            />
          </div>

          {/* Bottom Center spanning 2 */}
          <div className="md:col-span-2 lg:col-span-2 min-h-[150px]">
            <div className="h-full flex items-center justify-center bg-slate-800/30 rounded-2xl border border-slate-700/40 backdrop-blur-sm p-4 md:p-6">
              <div className="text-center">
                <Zap className="w-6 h-6 md:w-8 md:h-8 text-emerald-400 mx-auto mb-2 md:mb-3" />
                <p className="text-slate-300 font-semibold text-sm md:text-base">More AI Tools Coming Soon!</p>
              </div>
            </div>
          </div>

          {/* Bottom Right - Open Source Card */}
          <div className="group relative h-full min-h-[200px] bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-rose-900/20 rounded-2xl overflow-hidden border border-purple-500/30 backdrop-blur-sm p-4 md:p-6 flex flex-col items-center justify-center hover:border-purple-400/50 transition-all duration-500">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 md:w-20 md:h-20 bg-pink-500/10 rounded-full blur-2xl"></div>
            </div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-purple-500/20 border border-purple-400/30 mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                <Github className="w-5 h-5 md:w-6 md:h-6 text-purple-300" />
              </div>
              
              <h3 className="text-sm md:text-base font-semibold text-white mb-2">
                Open Source
              </h3>
              
              <p className="text-slate-400 text-xs mb-3 md:mb-4 leading-relaxed">
                Join our community and help build the future of AI tools
              </p>
              
              <button 
                onClick={() => window.open('https://github.com/SahilSuman1011/Toolie-AI', '_blank')}
                className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-purple-600 hover:bg-purple-700 hover:cursor-pointer text-white text-xs md:text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/25"
              >
                <Heart className="w-3 h-3 md:w-4 md:h-4" />
                Contribute
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AiTools