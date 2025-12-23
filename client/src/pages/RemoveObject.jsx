import { Scissors, Sparkles, Download } from 'lucide-react'
import React, {useState} from 'react'
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const RemoveObject = () => {

  const [input, setInput] = useState('')
  const [object, setObject] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const {getToken} = useAuth()

  const handleDownload = async () => {
    try {
      const response = await fetch(content);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      // Create filename using the removed object name
      const filename = `removed-${object.trim().toLowerCase()}-${new Date().getTime()}.png`;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('Image downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download image');
    }
  };
      
  const onSubmitHandler = async (e)=> {
  e.preventDefault();
  try {
    setLoading(true)

    if(object.split(' ').length > 1){
      return toast('Please enter only one object name')
    }

    const formData = new FormData()
    formData.append('image', input)
    formData.append('object', object)
    
    const token = await getToken();
    const {data} = await axios.post('/api/ai/remove-image-object', formData,
    {headers: {Authorization: `Bearer ${token}`}})

    if(data.success) {
    setContent(data.content)
    } else{
    toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
  setLoading(false)
  }

  return (
<div className='h-full overflow-y-scroll p-4 sm:p-6 flex flex-col lg:flex-row items-start gap-4 bg-slate-900'>
            {/* Left Col*/}
            <form onSubmit={onSubmitHandler} className='w-full lg:flex-1 lg:max-w-lg p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm'>
              <div className='flex items-center gap-3'>
                <Sparkles className='w-6 text-purple-400'/>
                <h1 className='text-xl font-semibold text-white'>Object Removal</h1>
              </div>
              <p className='mt-6 text-sm font-medium text-slate-300'>Upload Image</p>
    
              <input onChange={(e)=>setInput(e.target.files[0])} type="file" accept='image/*' className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-slate-600 bg-slate-900/50 text-white file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 file:cursor-pointer'
              required/>
              <p className='mt-6 text-sm font-medium text-slate-300'>Describe Object name to remove</p>
    
              <textarea onChange={(e)=>setObject(e.target.value)} value={object} rows={4} type="text" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-slate-600 bg-slate-900/50 text-white placeholder:text-slate-500 focus:border-purple-500 transition-colors'
              placeholder='e.g., watch or spoon, Only single object name' required/>
    
                <br/>
                <button disabled={loading} className='w-full flex justify-center items-center gap-2
                bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 mt-6
                text-sm rounded-lg cursor-pointer shadow-lg shadow-purple-500/20 transition-all disabled:opacity-50'>
                  {
                    loading ? <span className='w-4 h-4 my-1 rounded-full border-2
                    border-t-transparent animate-spin'></span>
                    : <Scissors className='w-5'/>
                  }
                  Remove Object
                </button>
      
            </form>
            {/* Right Col */}
            <div className='w-full lg:flex-1 lg:max-w-lg p-6 bg-slate-800/50 rounded-xl flex flex-col border
            border-slate-700/50 backdrop-blur-sm min-h-96'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <Scissors className='w-5 h-5 text-purple-400'/>
                  <h1 className='text-xl font-semibold text-white'>Processed Image</h1>
                </div>
                <button
                  onClick={handleDownload}
                  disabled={!content}
                  className={`p-2 rounded-full transition-colors ${content ? 'hover:bg-slate-700 cursor-pointer' : 'cursor-not-allowed'}`}
                  title={content ? 'Download processed image' : 'Process an image first'}
                >
                  <Download className={`w-5 h-5 ${content ? 'text-slate-400 hover:text-purple-400' : 'text-slate-600'}`} />
                </button>
              </div>

            {
              !content ? 
              (
              <div className='flex-1 flex justify-center items-center'>
              <div className='text-sm flex flex-col items-center gap-5 text-slate-500'>
              <Scissors className='w-9 h-9'/>
              <p>Upload an image and click "Remove Object" to get started</p>
              </div>
            </div>
              )
              :
              (
                <img src={content} alt='image' className='mt-3 w-full h-full'/>
              )
            }
    
        </div>
        </div>
  )
}

export default RemoveObject