import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { ArrowRight, Zap } from 'lucide-react'

const ToolCard = ({ tool, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 hover:border-blue-300/50 cursor-pointer"
    >
        {/* Gradient Orb on Hover */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>

        <div className="p-6 sm:p-8 flex flex-col h-full relative z-10">
            <div className="flex justify-between items-start mb-6">
                <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-md transform group-hover:scale-110 transition-transform duration-300"
                    style={{ background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})` }}
                >
                    <tool.Icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                {/* Subtle arrow that appears on hover */}
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-slate-400 group-hover:text-blue-600">
                    <ArrowRight className="w-4 h-4" />
                </div>
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                {tool.title}
            </h3>
            
            <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                {tool.description}
            </p>
            
            <div className="mt-auto pt-4 border-t border-slate-100">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-current" /> 
                    Available Now
                </span>
            </div>
        </div>
    </div>
  )
}

const AiTools = () => {
  const navigate = useNavigate()
  const { user } = useUser()

  return (
    <section className='relative px-4 sm:px-6 lg:px-8 bg-slate-50/50'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            Features 
          </span>
          <h2 className='text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight'>
            Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">AI Capabilities</span>
          </h2>
          <p className='text-lg text-slate-600 max-w-2xl mx-auto'>
            Access a comprehensive suite of tools designed to streamline your workflow and boost creativity instantly.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {AiToolsData.map((tool, index) => (
            <ToolCard
              key={index}
              tool={tool}
              onClick={() => user && navigate(tool.path)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default AiTools