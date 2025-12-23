import React, { useState } from 'react'
import Markdown from 'react-markdown'

const CreationItem = ({item}) => {

    const [expanded, setExpanded] = useState(false);

  return (
    <div onClick={() => setExpanded(!expanded)} className='p-4 max-w-5xl text-sm bg-slate-800 border border-slate-700 rounded-lg cursor-pointer'>
    <div className='flex justify-between items-center gap-4'>
    <div>
        <h2>{item.prompt}</h2>
            <p className='text-slate-400'>{item.type} - {new Date(item.created_at).toLocaleDateString()}</p>
            </div>
            <button className='bg-emerald-900/30 border border-emerald-700 text-emerald-300
            px-4 py-1 rounded-full whitespace-nowrap'>{item.type}</button>
        </div>
        
        <div>
            {
                expanded && (
                    <div>
                        {item.type === 'image' ? (
                         <div>
                        <img src={item.content} alt="image" className='mt-3
                        w-full max-w-md' />
                         </div>   
                        ) : (
                            <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-300'>
                            <div className='reset-tw'>
                             <Markdown>{item.content}</Markdown>
                            </div>
                            </div>    
                        )}
                    </div>    
                )
            }
        </div>

    </div>
  )
}

export default CreationItem