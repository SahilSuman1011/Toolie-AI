import { Hash, Sparkles, Edit, HashIcon, Copy, Check } from 'lucide-react'
import React, {useState} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import { useAuth } from '@clerk/clerk-react';


axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const BlogTitles = () => {

    const blogCategories = ['General', 'Technology', 'Health', 'Finance', 'Travel', 'Food', 'Lifestyle', 'Education', 'Entertainment', 'Business']
    
    const [selectedCategory, setSelectedCategory] = useState('General')
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
        const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategory}`
        const token = await getToken();

        const {data} = await axios.post('/api/ai/generate-blog-title', {prompt},
          {headers: {Authorization: `Bearer ${token}`}})

          if(data.success) {
            setContent(data.content)
            toast.success('Titles generated successfully!')
          } else{
            toast.error(data.message)
          }
      } catch (error) {
        console.error('Blog title generation error:', error);
        if (error.response?.status === 429) {
          toast.error('AI service is very busy. Please wait 2-3 minutes and try again.', {
            duration: 6000,
            icon: '⏳'
          });
        } else {
          toast.error(error.response?.data?.message || error.message || 'Failed to generate titles')
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
                <Sparkles className='w-6 text-cyan-400'/>
                <h1 className='text-xl font-semibold text-white'>AI Title Generator</h1>
              </div>
              <p className='mt-6 text-sm font-medium text-slate-300'>Keyword</p>
    
              <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-slate-600 bg-slate-900/50 text-white placeholder:text-slate-500 focus:border-cyan-500 transition-colors'
              placeholder='The Future of Artificial Intelligence is ....' required/>
              <p className='mt-4 text-sm font-medium text-slate-300'>Category</p>
    
              <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
                {blogCategories.map((item) => (
                  <span onClick={() => setSelectedCategory(item)} 
                  className={`text-xs px-4 py-1.5 border rounded-full cursor-pointer transition-all ${selectedCategory === item ? 'bg-cyan-600 text-white border-cyan-500 shadow-lg shadow-cyan-500/20' : 'text-slate-400 border-slate-600 hover:border-cyan-500/50'}`}
                  key={item}>{item}</span>
                ))}
              </div>
    
              <div>
                <br/>
                <button disabled={loading} className='w-full flex justify-center items-center gap-2
                bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-4 py-2 mt-6
                text-sm rounded-lg cursor-pointer shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50'>
                  {loading ? <span className='w-4 h-4 my-1 rounded-full 
                  border-2 border-t-transparent animate-spin'></span> : <Hash className='w-5'/>}
                  Generate Titles
                </button>
    
              </div>
    
            </form>
            {/* Right Col */}
            <div className='w-full lg:flex-1 lg:max-w-lg p-6 bg-slate-800/50 rounded-xl flex flex-col border
            border-slate-700/50 backdrop-blur-sm min-h-96'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <Hash className='w-5 h-5 text-cyan-400'/>
                  <h1 className='text-xl font-semibold text-white'>Generated Titles</h1>
                </div>
                <button
                  onClick={handleCopy}
                  disabled={!content}
                  className={`p-2 rounded-full transition-colors ${content ? 'hover:bg-slate-700 cursor-pointer' : 'cursor-not-allowed'}`}
                  title={content ? 'Copy to clipboard' : 'Generate titles first'}
                >
                  {copied ? (
                    <Check className='w-5 h-5 text-emerald-500' />
                  ) : (
                    <Copy className={`w-5 h-5 ${content ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-600'}`} />
                  )}
                </button>
              </div>
            {
              !content ? (
              <div className='flex-1 flex justify-center items-center'>
              <div className='text-sm flex flex-col items-center gap-5 text-slate-500'>
              <Hash className='w-9 h-9'/>
              <p>Enter a topic and click "Generate Title" to get started</p>
              </div>
            </div>
              ) : (
              <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-300 prose prose-invert prose-sm max-w-none'>
              <div className='.reset-tw'>
              <Markdown>{content}</Markdown> 
              </div>
                </div>
              )
            }
           
        </div>
        </div>
  )
}


export default BlogTitles