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
  const [showHelp, setShowHelp] = useState(false)
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
    } catch (error) {
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
      if (error.response?.status === 401) {
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
    <div className='h-full overflow-y-scroll p-6 flex items-start gap-4 text-slate-700'>
      {/* Left Col*/}
      <form onSubmit={onSubmitHandler} className='flex-1 max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#F7971E]'/>
          <h1 className='text-xl font-semibold'>LinkedIn Profile Optimizer</h1>
        </div>

        <div className='space-y-6'>
          {/* Headline Section */}
          <div className='relative'>
            <div className='flex items-center gap-2'>
              <p className='text-sm font-medium'>Headline</p>
              <HelpCircle 
                className='w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600'
                onClick={() => toast.success('Go to your LinkedIn profile → Click the pencil icon next to your name → Copy your headline')}
              />
            </div>
            <textarea 
              value={formData.headline}
              onChange={(e) => handleInputChange('headline', e.target.value)}
              className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600'
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
          bg-gradient-to-r from-[#F7971E] to-[#FFD200] text-white px-4 py-2 mt-6
          text-sm rounded-lg cursor-pointer'>
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
      <div className='flex-1 max-w-lg p-4 bg-white rounded-lg flex flex-col border
        border-gray-200 min-h-96 mx-h-[600px]'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <FileText className='w-5 h-5 text-[#F7971E]'/>
            <h1 className='text-xl font-semibold'>Enhanced Content</h1>
          </div>
          {content && (
            <button
              onClick={() => copyToClipboard(content, 'Content')}
              className='flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors'
            >
              {copiedSection === 'Content' ? (
                <CheckCheck className='w-4 h-4 text-green-500' />
              ) : (
                <Copy className='w-4 h-4' />
              )}
              Copy
            </button>
          )}
        </div>

        {
          !content ? (
            <div className='flex-1 flex justify-center items-center'>
              <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <FileText className='w-9 h-9'/>
                <p>Enter your LinkedIn content and click "Optimize Profile" to get started</p>
              </div>
            </div>
          ) : 
          (
            <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
              <div className='reset-tw prose prose-sm max-w-none'>
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