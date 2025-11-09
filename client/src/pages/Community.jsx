import { useAuth, useUser } from '@clerk/clerk-react'
import React, {useEffect, useState} from 'react'
import { Download } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const Community = () => {

  const [creations, setCreations] = useState([])
  const {user} = useUser()
  const [loading, setLoading] = useState(true)
  const {getToken} = useAuth()

  const fetchCreations = async () => {
    try {
      const {data} = await axios.get('/api/user/get-published-creations', {
        headers: {Authorization: `Bearer ${await getToken()}`}
      })
      if(data.success){
        setCreations(data.creations)
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  const handleDownload = async (imageUrl, prompt) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      // Create filename from prompt (limit length and remove invalid characters)
      const filename = `${prompt.slice(0, 30).replace(/[^a-z0-9]/gi, '_')}.png`;
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
  }

  useEffect(()=>{
    if(user){
      fetchCreations()
    }
  }, [user])
  
  return !loading ? (
    <div className='flex-1 h-full flex flex-col gap-4 p-6 text-xl font-semibold'>
      Creations
      <div className='bg-white h-full w-full rounded-xl overflow-y-scroll'>
        {creations.map((creation, index) => (
          <div key={index} className='relative group inline-block pl-3 pt-3 w-full
          sm:max-w-1/2 lg:max-w-1/3'>
            <img src={creation.content} alt="" className='w-full h-full object-cover rounded-lg'/>

            <div className='absolute bottom-0 top-0 right-0 left-3 flex gap-2
            items-end justify-end group-hover:justify-between p-3
            group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg'>
              <p className='text-sm hidden group-hover:block'>{creation.prompt}</p>

            <Download 
              onClick={() => handleDownload(creation.content, creation.prompt)}
              className="w-5 h-5 transition-transform cursor-pointer text-white"
            />
          </div>
        </div>

        ))}
      </div>
    </div>
  ) : (
    <div className='flex justify-center items-center h-full'>
      <span className='w-10 h-10 my-1 rounded-full border-3 
      border-primary border-t-transparent animate-spin'></span>
    </div>
  )
}

export default Community