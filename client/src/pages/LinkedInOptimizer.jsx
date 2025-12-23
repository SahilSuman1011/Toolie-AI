import { Sparkles, Copy, FileText, HelpCircle, CheckCheck } from 'lucide-react';
import React, { useState } from 'react'
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const LinkedInOptimizer = () => {
  const [formData, setFormData] = useState({
    headline: '',
    about: '',
    experience: '',
    skills: ''
  })
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  
  const [copiedSection, setCopiedSection] = useState('')
  const {getToken} = useAuth()

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const copyToClipboard = async (text, section) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedSection(section)
      toast.success(`${section} copied to clipboard!`)
      setTimeout(() => setCopiedSection(''), 2000)
    } catch {
      toast.error('Failed to copy text')
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = {
      headline: 'Headline',
      about: 'About section',
      experience: 'Current role description'
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key]) => !formData[key].trim())
      .map(([, label]) => label);

    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(', ')}`)
      return;
    }
    
    try {
      setLoading(true);
      setContent(''); // Clear previous content while loading

      // Get fresh token
      const token = await getToken();
      if (!token) {
        toast.error('Authentication failed. Please try again.');
        return;
      }

      const {data} = await axios.post('/api/ai/linkedin-optimize', 
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );

      if(data.success) {
        setContent(data.content);
        toast.success('Profile optimized successfully!');
      } else {
        toast.error(data.message || 'Failed to optimize profile. Please try again.');
      }
    } catch (error) {
      console.error('Optimization error:', error);
      if (error.response?.status === 429) {
        toast.error('AI service is very busy. Please wait 2-3 minutes and try again.', {
          duration: 6000,
          icon: '⏳'
        });
      } else if (error.response?.status === 401) {
        toast.error('Please sign in to use this feature');
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (!navigator.onLine) {
        toast.error('No internet connection. Please check your network.');
      } else {
        toast.error('Failed to optimize profile. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='h-full overflow-y-scroll p-4 sm:p-6 flex flex-col lg:flex-row items-start gap-4 bg-slate-900'>
      {/* Left Col*/}
      <form onSubmit={onSubmitHandler} className='w-full lg:flex-1 lg:max-w-lg p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-amber-400'/>
          <h1 className='text-xl font-semibold text-white'>LinkedIn Profile Optimizer</h1>
        </div>

        <div className='space-y-6 mt-6'>
          {/* Headline Section */}
          <div className='relative'>
            <div className='flex items-center gap-2'>
              <p className='text-sm font-medium text-slate-300'>Headline</p>
              <HelpCircle 
                className='w-4 h-4 text-slate-500 cursor-pointer hover:text-amber-400 transition-colors'
                onClick={() => toast.success('Go to your LinkedIn profile → Click the pencil icon next to your name → Copy your headline')}
              />
            </div>
            <textarea 
              value={formData.headline}
              onChange={(e) => handleInputChange('headline', e.target.value)}
              className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-slate-600 bg-slate-900/50 text-white placeholder:text-slate-500 focus:border-amber-500 transition-colors'
              rows={2}
              placeholder="Paste your LinkedIn headline here"
              required
            />
          </div>

          {/* About Section */}
          <div className='relative'>
            <div className='flex items-center gap-2'>
              <p className='text-sm font-medium'>About</p>
              <HelpCircle 
                className='w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600'
                onClick={() => toast.success('Go to your LinkedIn profile → Scroll to About section → Click the pencil icon → Copy the content')}
              />
            </div>
            <textarea 
              value={formData.about}
              onChange={(e) => handleInputChange('about', e.target.value)}
              className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600'
              rows={4}
              placeholder="Paste your About section content here"
              required
            />
          </div>

          {/* Experience Section */}
          <div className='relative'>
            <div className='flex items-center gap-2'>
              <p className='text-sm font-medium'>Current Role Description</p>
              <HelpCircle 
                className='w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600'
                onClick={() => toast.success('Go to your LinkedIn profile → Experience section → Click the pencil icon on your current role → Copy the description')}
              />
            </div>
            <textarea 
              value={formData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600'
              rows={4}
              placeholder="Paste your current role description here"
              required
            />
          </div>

          {/* Skills Section (Optional) */}
          <div className='relative'>
            <div className='flex items-center gap-2'>
              <p className='text-sm font-medium'>Key Skills (Optional)</p>
              <HelpCircle 
                className='w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600'
                onClick={() => toast.success('Go to your LinkedIn profile → Skills section → List your top skills')}
              />
            </div>
            <textarea 
              value={formData.skills}
              onChange={(e) => handleInputChange('skills', e.target.value)}
              className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600'
              rows={2}
              placeholder="List your key skills (comma separated)"
            />
          </div>
        </div>

        <button className='w-full flex justify-center items-center gap-2
          bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white px-4 py-2 mt-6
          text-sm rounded-lg cursor-pointer shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50'>
          {
            loading ? <span className='w-4 h-4 my-1 rounded-full border-2
              border-t-transparent animate-spin'></span>
              :
              <FileText className='w-5'/>
          }
          Optimize Profile
        </button>
      </form>

      {/* Right Col */}
      <div className='w-full lg:flex-1 lg:max-w-lg p-6 bg-slate-800/50 rounded-xl flex flex-col border
        border-slate-700/50 backdrop-blur-sm min-h-96 mx-h-[600px]'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <FileText className='w-5 h-5 text-amber-400'/>
            <h1 className='text-xl font-semibold text-white'>Enhanced Content</h1>
          </div>
          <button
            onClick={() => copyToClipboard(content, 'Content')}
            disabled={!content}
            className={`p-2 rounded-full transition-colors ${content ? 'hover:bg-slate-700 cursor-pointer' : 'cursor-not-allowed'}`}
            title={content ? 'Copy to clipboard' : 'Generate content first'}
          >
            {copiedSection === 'Content' ? (
              <CheckCheck className='w-5 h-5 text-emerald-500' />
            ) : (
              <Copy className={`w-5 h-5 ${content ? 'text-slate-400 hover:text-amber-400' : 'text-slate-600'}`} />
            )}
          </button>
        </div>

        {
          !content ? (
            <div className='flex-1 flex justify-center items-center'>
              <div className='text-sm flex flex-col items-center gap-5 text-slate-500'>
                <FileText className='w-9 h-9'/>
                <p>Enter your LinkedIn content and click "Optimize Profile" to get started</p>
              </div>
            </div>
          ) : 
          (
            <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-300'>
              <div className='reset-tw prose prose-invert prose-sm max-w-none'>
                <Markdown>{content}</Markdown>
                {content && (
                  <div className='mt-6 text-xs text-gray-500'>
                    Note: Review and adjust the optimized content before using it on LinkedIn.
                  </div>
                )}
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default LinkedInOptimizer