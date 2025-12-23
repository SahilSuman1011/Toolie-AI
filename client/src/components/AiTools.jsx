import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { ArrowRight, Zap } from 'lucide-react'

const ToolCard = ({ tool, onClick, isLast }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
    >
        {/* Colored top accent bar */}
        <div 
          className="absolute top-0 left-0 right-0 h-1 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
          style={{ background: `linear-gradient(90deg, ${tool.bg.from}, ${tool.bg.to})` }}
        />
        
        {/* Background pattern - subtle on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.03),transparent_50%)]"></div>
        </div>

        <div className="relative p-5 sm:p-6 flex flex-col h-full">
            {/* Icon with modern styling */}
            <div className="mb-5">
                <div 
                    className="inline-flex w-14 h-14 rounded-2xl items-center justify-center transform group-hover:scale-105 group-hover:-rotate-3 transition-all duration-500 shadow-sm group-hover:shadow-lg"
                    style={{ 
                      background: `linear-gradient(135deg, ${tool.bg.from}15, ${tool.bg.to}15)`,
                      border: `1.5px solid ${tool.bg.from}30`
                    }}
                >
                    <tool.Icon 
                      className="w-7 h-7 transition-transform duration-500 group-hover:scale-110" 
                      style={{ color: tool.bg.from }}
                      strokeWidth={1.8} 
                    />
                </div>
            </div>
            
            {/* Title */}
            <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight group-hover:text-slate-800 transition-colors">
                {tool.title}
            </h3>
            
            {/* Description */}
            <p className="text-slate-600 text-sm leading-relaxed flex-grow font-light">
                {tool.description}
            </p>
            
            {/* Footer with arrow */}
            <div className="mt-4 flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Try Now
                </span>
                <div 
                  className="w-8 h-8 rounded-xl flex items-center justify-center transform translate-x-0 group-hover:translate-x-1 transition-all duration-300"
                  style={{ background: `linear-gradient(135deg, ${tool.bg.from}10, ${tool.bg.to}10)` }}
                >
                    <ArrowRight 
                      className="w-3.5 h-3.5" 
                      style={{ color: tool.bg.from }}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

const AiTools = () => {
  const navigate = useNavigate()
  const { user } = useUser()

  return (
    <section className='relative py-6 sm:py-10 px-3 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50/30 to-white overflow-hidden'>
      <div className='max-w-7xl mx-auto'>
        {/* Section Header */}
        <div className='text-center mb-10'>
          <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-slate-100/80 border border-slate-200/60 text-slate-700 text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Powerful Features
          </div>
          
          <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight px-2'>
            Everything You Need <br className="hidden sm:block" />
            in <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">One Place</span>
              <svg className="absolute -bottom-2 left-0 right-0 h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
                <path d="M0,7 Q50,0 100,7 T200,7" fill="none" stroke="url(#gradient)" strokeWidth="3" opacity="0.3"/>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#9333ea" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          
        </div>

        {/* Tools Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
          {AiToolsData.map((tool, index) => (
            <ToolCard
              key={index}
              tool={tool}
              onClick={() => user && navigate(tool.path)}
              isLast={index === AiToolsData.length - 1}
            />
          ))}
        </div>

        {/* Coming Soon Badge - Below the last card */}
        <div className="flex justify-end mt-6 lg:mt-8 lg:pr-6">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md animate-pulse"></div>
            <div className="relative flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full text-white text-sm font-bold shadow-lg animate-bounce" style={{animationDuration: '2s'}}>
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
              </span>
              More Tools Coming Soon!
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AiTools