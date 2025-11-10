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
    } catch (err) {
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
      toast.error(error.response?.data?.message || error.message || 'Failed to generate article')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start gap-4 text-slate-700'>
        {/* Left Col*/}
        <form onSubmit={onSubmitHandler} className='flex-1 max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
          <div className='flex items-center gap-3'>
            <Sparkles className='w-6 text-[#FF6B6B]'/>
            <h1 className='text-xl font-semibold'>Article Configuration</h1>
          </div>
          <p className='mt-6 text-sm font-medium'>Article Topic</p>

          <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300'
          placeholder='The Future of Artificial Intelligence is ....' required/>
          <p className='mt-4 text-sm font-medium'>Article Length</p>

          <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
            {articleLength.map((item, index) => (
              <span onClick={() => setSelectedLength(item)} 
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedLength.text === item.text ? 'bg-red-50 text-red-700 border-red-300' : 'text-gray-500 border-gray-300'}`}
              key={index}>{item.text}</span>
            ))}
          </div>

          <div>
            <br/>
            <button disabled={loading} className='w-full flex justify-center items-center gap-2
            bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white px-4 py-2 mt-6
            text-sm rounded-lg cursor-pointer'>
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
        <div className='flex-1 max-w-lg p-4 bg-white rounded-lg flex flex-col border
        border-gray-200 min-h-96 max-h-[600px]'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <Edit className='w-5 h-5 text-[#FF6B6B]'/>
              <h1 className='text-xl font-semibold'>Generated Article</h1>
            </div>
            <button
              onClick={handleCopy}
              disabled={!content}
              className={`p-2 rounded-full transition-colors ${content ? 'hover:bg-gray-100 cursor-pointer' : 'cursor-not-allowed'}`}
              title={content ? 'Copy to clipboard' : 'Generate article first'}
            >
              {copied ? (
                <Check className='w-5 h-5 text-green-500' />
              ) : (
                <Copy className={`w-5 h-5 ${content ? 'text-gray-500 hover:text-gray-700' : 'text-gray-300'}`} />
              )}
            </button>
          </div>

        {!content ? (<div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
          <Edit className='w-9 h-9'/>
          <p>Enter a topic and click "Generate Article" to get started</p>
          </div>
        </div>
      ) : (
        <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
          <div className='.reset-tw'>
          <Markdown>{content}</Markdown> 
          </div>
        </div>
      )}

    </div>
    </div>
  )
}

export default WriteArticle