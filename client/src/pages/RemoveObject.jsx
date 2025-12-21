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
<div className='h-full overflow-y-scroll p-4 sm:p-6 flex flex-col lg:flex-row items-start gap-4 text-slate-700'>
            {/* Left Col*/}
            <form onSubmit={onSubmitHandler} className='w-full lg:flex-1 lg:max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
              <div className='flex items-center gap-3'>
                <Sparkles className='w-6 text-[#8E2DE2]'/>
                <h1 className='text-xl font-semibold'>Object Removal</h1>
              </div>
              <p className='mt-6 text-sm font-medium'>Upload Image</p>
    
              <input onChange={(e)=>setInput(e.target.files[0])} type="file" accept='image/*' className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600'
              required/>
              <p className='mt-6 text-sm font-medium'>Describe Object name to remove</p>
    
              <textarea onChange={(e)=>setObject(e.target.value)} value={object} rows={4} type="text" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300'
              placeholder='e.g., watch or spoon, Only single object name' required/>
    
                <br/>
                <button disabled={loading} className='w-full flex justify-center items-center gap-2
                bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] text-white px-4 py-2 mt-6
                text-sm rounded-lg cursor-pointer'>
                  {
                    loading ? <span className='w-4 h-4 my-1 rounded-full border-2
                    border-t-transparent animate-spin'></span>
                    : <Scissors className='w-5'/>
                  }
                  Remove Object
                </button>
      
            </form>
            {/* Right Col */}
            <div className='w-full lg:flex-1 lg:max-w-lg p-4 bg-white rounded-lg flex flex-col border
            border-gray-200 min-h-96'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <Scissors className='w-5 h-5 text-[#8E2DE2]'/>
                  <h1 className='text-xl font-semibold'>Processed Image</h1>
                </div>
                <button
                  onClick={handleDownload}
                  disabled={!content}
                  className={`p-2 rounded-full transition-colors ${content ? 'hover:bg-gray-100 cursor-pointer' : 'cursor-not-allowed'}`}
                  title={content ? 'Download processed image' : 'Process an image first'}
                >
                  <Download className={`w-5 h-5 ${content ? 'text-gray-500 hover:text-gray-700' : 'text-gray-300'}`} />
                </button>
              </div>

            {
              !content ? 
              (
              <div className='flex-1 flex justify-center items-center'>
              <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
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