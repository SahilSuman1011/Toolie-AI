import React, { useEffect, useState } from 'react'
import { Gem, Sparkles } from 'lucide-react'
import { Protect, useAuth } from '@clerk/clerk-react'
import CreationItem from '../components/CreationItem'
import axios from 'axios'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {
const [creations, setCreations] = useState([])
const [loading, setLoading] = useState(true)
const {getToken} = useAuth()

const getDashboardData = async () => {
  try {
    const {data} = await axios.get('/api/user/get-user-creations', {
      headers: {Authorization: `Bearer ${await getToken()}`}
    })

    if(data.success){
      setCreations(data.creations)
    } else{
      toast.error(data.message)
    }
  } catch(error) {
    toast.error(error.message)
  } finally {
    setLoading(false)
  }
}

useEffect(()=>{
  getDashboardData()
}, [])

  return (
    <div className='h-full p-6 overflow-y-scroll bg-slate-900'>
        <div className='flex justify-start gap-4 flex-wrap'>
          {/*Total Creations Card */}
          <div className='flex justify-between items-center w-72 p-4 px-6 bg-slate-800/50
          rounded-xl border border-slate-700/50 backdrop-blur-sm hover:border-emerald-500/40 transition-all duration-300'>
            <div className='text-slate-200'>
              <p className='text-sm text-slate-400'>Total Creations</p>
              <h2 className='text-2xl font-semibold text-white'>{creations.length}</h2>
            </div>
            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500
            to-cyan-500 text-white flex justify-center items-center shadow-lg shadow-emerald-500/20'>
              <Sparkles className='w-6 text-white'/>
            </div>
          </div>

            {/*Active Plan Card */}

          <div className='flex justify-between items-center w-72 p-4 px-6 bg-slate-800/50
          rounded-xl border border-slate-700/50 backdrop-blur-sm hover:border-amber-500/40 transition-all duration-300'>
            <div className='text-slate-200'>
              <p className='text-sm text-slate-400'>Active Plan</p>
              <h2 className='text-2xl font-semibold text-white'>
                <Protect plan='premium' fallback="Free">Premium</Protect>
                </h2>
            </div>
            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500
            to-orange-500 text-white flex justify-center items-center shadow-lg shadow-amber-500/20'>
              <Gem className='w-6 text-white'/>
            </div>
          </div>
        </div>

        {
          loading ? (
            <div className='flex justify-center items-center h-3/4'>
              <div className='animate-spin rounded-full h-12 w-12 border-4 
              border-emerald-500 border-t-transparent shadow-lg shadow-emerald-500/20'></div>
            </div>
          ) : 
          (
          <div className='space-y-3'>
          <p className='mt-6 mb-4 text-lg font-semibold text-white'>Recent Creations</p>
          {
            creations.map((item) => <CreationItem key={item.id} item  = {item}/>)
          }
        </div>
          )
        }
        
    </div>
  )
}

export default Dashboard