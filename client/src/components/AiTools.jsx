import React from 'react'
import { AiToolsData } from '../assets/assets'
import {useNavigate} from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { EvervaultCard, Icon } from './ui/evervault-card'

const AiToolCard = ({ tool, onClick }) => {
  return (
    <div 
      className="relative h-[320px] w-full max-w-xs mx-auto rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      onClick={onClick}
    >
      <EvervaultCard text={tool.title} className="cursor-pointer">
        <div className="relative h-full w-full p-6 flex flex-col">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`
            }}
          >
            <tool.Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
          
          <h3 className="text-lg font-semibold mt-4 text-gray-900">{tool.title}</h3>
          <p className="mt-3 text-gray-600 text-sm leading-relaxed grow">
            {tool.description}
          </p>
          
          <div className="mt-4">
            <span className="text-xs font-medium px-3 py-1.5 rounded-full border border-black/10 hover:border-black/20 transition-colors">
              Try Now →
            </span>
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