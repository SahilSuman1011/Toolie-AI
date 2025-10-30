import React from 'react'
import { AiToolsData, assets } from '../assets/assets'
import {useNavigate} from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { EvervaultCard, Icon } from './ui/evervault-card'

const AiToolCard = ({ tool, onClick }) => {
  return (
    <div 
      className="group relative h-[280px] w-full max-w-xs mx-auto rounded-2xl overflow-hidden 
                 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
                 hover:shadow-[0_2px_20px_-3px_rgba(0,0,0,0.1),0_10px_25px_-2px_rgba(0,0,0,0.06)]
                 transition-all duration-300"
      onClick={onClick}
    >
      {/* Base gradient background */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${assets.gradientBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: '0.15'
        }}
      />

      <EvervaultCard text={tool.title} className="cursor-pointer">
        <div className="relative h-full w-full p-6 flex flex-col bg-white/50 backdrop-blur-[1px]">
          {/* Icon with gradient background */}
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`
            }}
          >
            <tool.Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
          
          {/* Content */}
          <h3 className="text-xl font-semibold mt-4 text-gray-900">{tool.title}</h3>
          <p className="mt-2.5 text-gray-600 text-sm leading-relaxed line-clamp-3 grow">
            {tool.description}
          </p>
          
          {/* Try Now button */}
          <div className="mt-4">
            <button className="flex items-center text-sm font-medium text-[#111827] hover:text-[#2F80ED] transition-colors">
              Try Now
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1">
                <path d="M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z" 
                  fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </EvervaultCard>
    </div>
  );
};

const AiTools = () => {
  const navigate = useNavigate()
  const {user} = useUser()

  return (
    <div className='px-4 sm:px-20 xl:px-32 my-20'>
      <div className='text-center'>
        <h2 className='text-slate-700 text-[42px] font-semibold'>Powerful AI Tools</h2>
        <p className='text-gray-500 max-w-lg mx-auto'>
          Everything you need to create, enhance and optimize using cutting-edge AI Technology.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12'>
        {AiToolsData.map((tool, index) => (
          <AiToolCard
            key={index}
            tool={tool}
            onClick={() => user && navigate(tool.path)}
          />
        ))}
      </div>   
    </div>
  )
}

export default AiTools