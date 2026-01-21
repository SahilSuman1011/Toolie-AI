import { Sparkles, Edit, Hash, Image, Download } from 'lucide-react'
import React, {useState} from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;


const GenerateImages = () => {

  const imageStyle = ['Cartoon', '3D Render', 'Pixel Art', 'Painting', 'Sketch', 'Portrait', 'Ghibli',
    'Realistic', 'Cyberpunk', 'Fantasy']
  const [publish, setPublish] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState('Cartoon')
  const [input, setInput] = useState('')
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
      // Create filename from input prompt (limit length and remove invalid characters)
      const filename = `${input.slice(0, 30).replace(/[^a-z0-9]/gi, '_')}_${selectedStyle}.png`;
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

          const prompt = `Generate an image of ${input} in 
          ${selectedStyle} style`
          const token = await getToken();
          const {data} = await axios.post('/api/ai/generate-image', {prompt, publish},
          {headers: {Authorization: `Bearer ${token}`}})

          if(data.success) {
            setContent(data.content)
            toast.success('Image generated successfully!')
          } else{
            toast.error(data.message)
          }
        } catch (error) {
          console.error('Image generation error:', error);
          console.log('Error response:', error.response);
          console.log('Error response data:', error.response?.data);
          
          // Handle different error status codes with appropriate messages
          const status = error.response?.status;
          const backendMessage = error.response?.data?.message;
          
          if (status === 400 || status === 422) {
            // Content moderation or validation errors - prioritize backend message
            if (backendMessage) {
              toast.error(`⛔ ${backendMessage}`);
            } else {
              toast.error('⛔ Request denied due to inappropriate content. Please modify your prompt.');
            }
          } else if (status === 429) {
            toast.error('⏳ AI service is busy. Please wait a few minutes and try again.');
          } else if (status === 403) {
            toast.error('🔒 This feature requires a premium subscription.');
          } else {
            // Generic error fallback
            toast.error(backendMessage || 'Failed to generate image. Please try again.');
          }
        }
        setLoading(false)
      }

  return (
     <div className='h-full overflow-y-scroll p-4 sm:p-6 flex flex-col lg:flex-row items-start gap-4 bg-slate-900'>
            {/* Left Col*/}
            <form onSubmit={onSubmitHandler} className='w-full lg:flex-1 lg:max-w-lg p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm'>
              <div className='flex items-center gap-3'>
                <Sparkles className='w-6 text-amber-400'/>
                <h1 className='text-xl font-semibold text-white'>AI Image Generator</h1>
              </div>
              <p className='mt-6 text-sm font-medium text-slate-300'>Describe Your Image</p>
    
              <textarea onChange={(e)=>setInput(e.target.value)} value={input} rows={4} type="text" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-slate-600 bg-slate-900/50 text-white placeholder:text-slate-500 focus:border-amber-500 transition-colors'
              placeholder='Describe what you want to see in the image....' required/>
              
              <p className='mt-4 text-sm font-medium text-slate-300'>Style</p>
    
              <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
                {imageStyle.map((item) => (
                  <span onClick={() => setSelectedStyle(item)} 
                  className={`text-xs px-4 py-1.5 border rounded-full cursor-pointer transition-all ${selectedStyle === item ? 'bg-amber-600 text-white border-amber-500 shadow-lg shadow-amber-500/20' : 'text-slate-400 border-slate-600 hover:border-amber-500/50'}`}
                  key={item}>{item}</span>
                ))}
              </div>

              <div className='my-6 flex items-center gap-2'>
                <label className='relative cursor-pointer'>
                  <input type='checkbox' onChange={(e)=>setPublish(e.target.checked)}
                  checked={publish} className='sr-only peer'/>

                  <div className='w-9 h-5 bg-slate-700 rounded-full
                  peer-checked:bg-emerald-600 transition'></div>

                  <span className='absolute left-1 top-1 w-3 h-3 bg-white
                  rounded-full transition peer-checked:translate-x-4'></span>
                </label>

                <p className='text-sm text-slate-300'>Make this image Public</p>

              </div>
  
                <button disabled={loading} className='w-full flex justify-center items-center gap-2
                bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-4 py-2 mt-6
                text-sm rounded-lg cursor-pointer shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50'>
                  {
                  loading ? <span className='w-4 h-4 my-1 rounded-full border-2
                  border-t-transparent animate-spin'></span>
                  : <Image className='w-5'/>}
                  Generate Image
                </button>
    
            </form>
            {/* Right Col */}
            <div className='flex-1 max-w-lg p-6 bg-slate-800/50 rounded-xl flex flex-col border
            border-slate-700/50 backdrop-blur-sm min-h-96'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <Image className='w-5 h-5 text-amber-400'/>
                  <h1 className='text-xl font-semibold text-white'>Generated Image</h1>
                </div>
                <button
                  onClick={handleDownload}
                  disabled={!content}
                  className={`p-2 rounded-full transition-colors ${content ? 'hover:bg-slate-700 cursor-pointer' : 'cursor-not-allowed'}`}
                  title={content ? 'Download generated image' : 'Generate an image first'}
                >
                  <Download className={`w-5 h-5 ${content ? 'text-slate-400 hover:text-amber-400' : 'text-slate-600'}`} />
                </button>
              </div>

              {!content ? (
                <div className='flex-1 flex justify-center items-center'>
                  <div className='text-sm flex flex-col items-center gap-5 text-slate-500'>
                    <Image className='w-9 h-9'/>
                    <p>Enter a topic and click "Generate Image" to get started</p>
                  </div>
                </div>
              ) : (
                <img src={content} alt="image" className='mt-3 w-full h-full object-contain'/>
              )}
        </div>
        </div>
  )
}

export default GenerateImages