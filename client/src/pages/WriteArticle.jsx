import { Edit, Edit2, EditIcon, Sparkles, Copy, Check } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;


const WriteArticle = () => {

  const articleLength = [
    {length: 800, text: 'Short (500-800 words)'},
    {length: 1200, text: 'Medium (800-1200 words)'},
    {length: 1600, text: 'Long (1200+ words)'},
  ]

  const [selectedLength, setSelectedLength] = useState(articleLength[0])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const [copied, setCopied] = useState(false)
  const {getToken} = useAuth()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  }

  const onSubmitHandler = async (e)=> {
    e.preventDefault();
    try {
      setLoading(true)
      const prompt = `Write an article about ${input} in ${selectedLength.text}`
      const token = await getToken();
      
      const {data} = await axios.post('/api/ai/generate-article', 
        {
          prompt, 
          length: selectedLength.length
        }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if(data.success){
        setContent(data.content)
        toast.success('Article generated successfully!')
      } else {
        toast.error(data.message || 'Failed to generate article')
      }
    } catch(error){
      console.error('Article generation error:', error);
      if (error.response?.status === 429) {
        toast.error('AI service is very busy. Please wait 2-3 minutes and try again.', {
          duration: 6000,
          icon: '⏳'
        });
      } else {
        toast.error(error.response?.data?.message || error.message || 'Failed to generate article')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='h-full overflow-y-scroll p-4 sm:p-6 flex flex-col lg:flex-row items-start gap-4 bg-slate-900'>
        {/* Left Col*/}
        <form onSubmit={onSubmitHandler} className='w-full lg:flex-1 lg:max-w-lg p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm'>
          <div className='flex items-center gap-3'>
            <Sparkles className='w-6 text-emerald-400'/>
            <h1 className='text-xl font-semibold text-white'>Article Configuration</h1>
          </div>
          <p className='mt-6 text-sm font-medium text-slate-300'>Article Topic</p>

          <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-slate-600 bg-slate-900/50 text-white placeholder:text-slate-500 focus:border-emerald-500 transition-colors'
          placeholder='The Future of Artificial Intelligence is ....' required/>
          <p className='mt-4 text-sm font-medium text-slate-300'>Article Length</p>

          <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
            {articleLength.map((item, index) => (
              <span onClick={() => setSelectedLength(item)} 
              className={`text-xs px-4 py-1.5 border rounded-full cursor-pointer transition-all ${selectedLength.text === item.text ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-500/20' : 'text-slate-400 border-slate-600 hover:border-emerald-500/50'}`}
              key={index}>{item.text}</span>
            ))}
          </div>

          <div>
            <br/>
            <button disabled={loading} className='w-full flex justify-center items-center gap-2
            bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white px-4 py-2 mt-6
            text-sm rounded-lg cursor-pointer shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50'>
              {
                loading ? <span className='W-4 h-4 my-1 rounded-full border-2
                border-t-transparent animate-spin'></span>
                : <Edit className='w-5'/>
              }
              Generate Article
            </button>
          </div>
        </form>

        {/* Right Col */}
        <div className='flex-1 max-w-lg p-6 bg-slate-800/50 rounded-xl flex flex-col border
        border-slate-700/50 backdrop-blur-sm min-h-96 max-h-[600px]'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <Edit className='w-5 h-5 text-emerald-400'/>
              <h1 className='text-xl font-semibold text-white'>Generated Article</h1>
            </div>
            <button
              onClick={handleCopy}
              disabled={!content}
              className={`p-2 rounded-full transition-colors ${content ? 'hover:bg-slate-700 cursor-pointer' : 'cursor-not-allowed'}`}
              title={content ? 'Copy to clipboard' : 'Generate article first'}
            >
              {copied ? (
                <Check className='w-5 h-5 text-emerald-500' />
              ) : (
                <Copy className={`w-5 h-5 ${content ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-600'}`} />
              )}
            </button>
          </div>

        {!content ? (<div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-slate-500'>
          <Edit className='w-9 h-9'/>
          <p>Enter a topic and click "Generate Article" to get started</p>
          </div>
        </div>
      ) : (
        <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-300 prose prose-invert prose-sm max-w-none'>
          <Markdown>{content}</Markdown>
        </div>
      )}

    </div>
    </div>
  )
}

export default WriteArticle