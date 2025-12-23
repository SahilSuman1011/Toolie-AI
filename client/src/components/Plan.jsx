import React from 'react'
import {PricingTable} from '@clerk/clerk-react'
import './Plan.css'

const Plan = () => {
  return (
    <div className='max-w-5xl mx-auto z-20 my-8 bg-slate-900 px-4'>

        <div className='text-center mb-8'>
            <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-emerald-900/30 border border-emerald-700/60 text-emerald-300 text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Pricing Plans
            </div>
            <h2 className='text-4xl md:text-5xl font-bold text-white tracking-tight mb-4'>Choose Your Plan</h2>
            <p className='text-slate-400 max-w-lg mx-auto'>Start for free and scale up as your needs grow. Find the perfect plan for your needs.</p>
        </div>
        
        <div className='mt-8 pricing-table-container'>
            <PricingTable/>
        </div>
        
    </div>
  )
}

export default Plan